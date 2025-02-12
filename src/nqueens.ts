import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

export function solveNQueens(n: number): string[][] {
    if(!Number.isInteger(n) || n < 1) {
        throw new Error("n devrait être un entier positif");
    }
    if (n > 14) {
        throw new Error("n est beaucoup trop grand");
    }

    if (n === 1) {
        return [["#"]];
    }
    if (n === 2 || n === 3) {
        return [];
    }
  
    const solutions: string[][] = [];
    const cols = new Array(n).fill(-1);
    function searchQueens(row: number) {
      if (row === n) {
        solutions.push(buildBoard(cols));
        return;
      }
  
      for (let col = 0; col < n; col++) {
        if (isValid(row, col)) {
          cols[row] = col;
          searchQueens(row + 1);
        }
      }
    }
  
    function isValid(rowToPlace: number, colToPlace: number): boolean {
      for (let r = 0; r < rowToPlace; r++) {
        const c = cols[r];
        if (c === colToPlace) return false;
        if (Math.abs(r - rowToPlace) === Math.abs(c - colToPlace)) return false;
      }
      return true;
    }
  
    function buildBoard(cols: number[]): string[] {
      const board: string[] = [];
      for (let r = 0; r < n; r++) {
        let rowStr = "";
        for (let c = 0; c < n; c++) {
          rowStr += (cols[r] === c) ? "#" : "O";
        }
        board.push(rowStr);
      }
      return board;
    }
    searchQueens(0);
  
    return solutions;
  }

// PARTIE 2

export function findSingleAttackConfigurations(n: number): string[][][] {
    if (n < 4) {
      throw new Error("L'échiquier doit être au minimum 4x4.");
    }
  
    const solutions: Set<string> = new Set();
    const board: string[][] = Array(n).fill(null).map(() => Array(n).fill("O"));
  
    function placeQueens(count: number, board: string[][], row: number = 0) {
      if (count === 4) {
        if (isValidSingleAttack(board)) {
          const boardString = board.map(row => row.join("")).join("\n");
          solutions.add(boardString);
        }
        return;
      }
  
      for (let r = row; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (board[r][c] === "O") {
            const newBoard = board.map(row => [...row]);
            newBoard[r][c] = "#";
            placeQueens(count + 1, newBoard, r);
          }
        }
      }
    }
  
    function isValidSingleAttack(board: string[][]): boolean {
      const queens: [number, number][] = [];
  
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (board[r][c] === "#") {
            queens.push([r, c]);
          }
        }
      }
  
      if (queens.length !== 4) return false;
  
      let attackCount = new Map<number, number>();
  
      for (const [r1, c1] of queens) {
        let attacks = 0;
        for (const [r2, c2] of queens) {
          if (r1 === r2 && c1 === c2) continue;
          if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
            attacks++;
          }
        }
        attackCount.set(r1 * n + c1, attacks);
      }
  
      return [...attackCount.values()].every(count => count === 1);
    }
  
    placeQueens(0, board);
  
    return Array.from(solutions).map(sol => sol.split("\n").map(row => row.split("")));
  }

  //INTERFACE POUR CHOISIR LA PARTIE 1 OU 2
  
  rl.question("Choisissez le problème : (1) N-Queens ou (2) Single-Attack Queens ? ", (choice) => {
    if (choice !== "1" && choice !== "2") {
      console.log("Erreur : veuillez entrer 1 ou 2.");
      rl.close();
      return;
    }
  
    rl.question("Entrez la valeur de N : ", (input) => {
      const n = parseInt(input, 10);
  
      if (isNaN(n) || n < 4) {
        console.log("Erreur : Veuillez entrer un entier valide (n >= 4).");
        rl.close();
        return;
      }
  
      if (choice === "1") {
        const solutions = solveNQueens(n);
        console.log(`\nNombre de solutions pour n=${n} : ${solutions.length}`);
        solutions.forEach((solution, index) => {
          console.log(`\nSolution #${index + 1}:`);
          solution.forEach(row => console.log(row));
          console.log("------");
        });
      } else if (choice === "2") {
        const solutions = findSingleAttackConfigurations(n);
        console.log(`\nNombre de solutions pour Single-Attack Queens (${n}x${n}) : ${solutions.length}`);
        solutions.forEach((solution, index) => {
          console.log(`\nSolution #${index + 1}:`);
          solution.forEach(row => console.log(row));
          console.log("------");
        });
      }
  
      rl.close();
    });
  });