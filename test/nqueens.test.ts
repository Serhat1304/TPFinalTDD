import { solveNQueens } from "../src/nqueens";

describe('NQueens', () => {
    it('should return 1 solution for n=1', () => {
      const solutions = solveNQueens(1);
      expect(solutions.length).toBe(1);
      expect(solutions[0]).toEqual(["#"]);
    });
  });
  