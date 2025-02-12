export function solveNQueens(n: number) : string[][]{
    if (n === 1) {
        return [["#"]];
    }
    if (n == 2 || n == 3) {
        return [];
    }
    return [];

    const solutions : string [][] = [];
    const cols = Array(n).fill(-1);

    function searchQueens(row: number) {
        if (row == n) {
            return;
        } for (let col = 0; col < n; col++) {
            
        }
    }

    return solutions
}
