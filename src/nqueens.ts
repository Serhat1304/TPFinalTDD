export function solveNQueens(n: number): string[][] {
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
