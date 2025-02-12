import * as readline from "readline";

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

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("Entrez la valeur de N : ", (input) => {
    const n = parseInt(input, 10);
  
    if (isNaN(n) || n < 1) {
      console.log("Erreur : Veuillez entrer un entier valide (n >= 1).");
    } else {
      const solutions = solveNQueens(n);
      console.log(`\nNombre de solutions pour n=${n} : ${solutions.length}`);
      solutions.forEach((solution, index) => {
        console.log(`\nSolution #${index + 1}:`);
        solution.forEach(row => console.log(row));
        console.log("------");
      });
    }
  
    rl.close();
  });

// PARTIE 2

export function findSingleAttackConfigurations(n: number): string[][][] {
    if (n < 4) {
      throw new Error("L'échiquier doit être au minimum 4x4.");
    }
  
    const solutions: string[][][] = [];
  
  
    return solutions;
  }