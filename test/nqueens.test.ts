import { solveNQueens } from "../src/nqueens";

describe('NQueens', () => {
    it('should return 1 solution for n=1', () => {
      const solutions = solveNQueens(1);
      expect(solutions.length).toBe(1);
      expect(solutions[0]).toEqual(["#"]);
    });
    it('should return 0 solution for n=2', () => {
        const solutions = solveNQueens(2);
        expect(solutions.length).toBe(0);
    });
    it('should return 0 solution for n=3', () => {
        const solutions = solveNQueens(3);
        expect(solutions.length).toBe(0);
    });
    it("should return 2 solutions for n=4", () => {
        const solutions = solveNQueens(4);
        expect(solutions.length).toBe(2);
    });
});
  