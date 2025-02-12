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
        const expectedSolutions = [
            [
              "O#OO",
              "OOO#",
              "#OOO",
              "OO#O",
            ],
            [
              "OO#O",
              "#OOO",
              "OOO#",
              "O#OO",
            ],
          ];
      
          expect(solutions.length).toBe(2);
          expect(solutions).toEqual(expectedSolutions);
        expect(solutions.length).toBe(2);
    });
    it("should return 10 solutions for n=5", () => {
        const solutions = solveNQueens(5);
        expect(solutions.length).toBe(10);
    });
    
    it("should return 4 solutions for n=6", () => {
        const solutions = solveNQueens(6);
        expect(solutions.length).toBe(4);
    });
    it("should only accept positive integers", () => {
        expect(() => solveNQueens(-4)).toThrow("n devrait être un entier positif");
        expect(() => solveNQueens(0)).toThrow("n devrait être un entier positif");
        expect(() => solveNQueens("4" as unknown as number)).toThrow();
      });
});
  