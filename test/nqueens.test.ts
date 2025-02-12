import { findSingleAttackConfigurations, solveNQueens } from "../src/nqueens";

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
      it("should return 14200 solutions for n=12 in a reasonable time", () => {
        const startTime = Date.now();
        const solutions = solveNQueens(12);
        const endTime = Date.now();
    
        expect(solutions.length).toBe(14200);
        expect(endTime - startTime).toBeLessThan(10000);
    });
    it("should return solutions of correct dimensions (n x n)", () => {
        for (let n = 4; n <= 8; n++) {
            const solutions = solveNQueens(n);
            for (const solution of solutions) {
                expect(solution.length).toBe(n);
                solution.forEach(row => expect(row.length).toBe(n));
            }
        }
    });

    //Tests pour la partie 2


    it("should return at least one valid solution for n=4", () => {
        const solutions = findSingleAttackConfigurations(4);
        expect(solutions.length).toBeGreaterThan(0);
        solutions.forEach((solution) => {
          expect(solution.length).toBe(4);
          solution.forEach(row => expect(row.length).toBe(4));
        });
      });
      it("should ensure each queen attacks and is attacked exactly once", () => {
        const solutions = findSingleAttackConfigurations(4);
    
        solutions.forEach(solution => {
          let queens: [number, number][] = [];
    
          for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
              if (solution[r][c] === "#") {
                queens.push([r, c]);
              }
            }
          }
    
          let attackCount = new Map<number, number>();
    
          for (const [r1, c1] of queens) {
            let attacks = 0;
            for (const [r2, c2] of queens) {
              if (r1 === r2 && c1 === c2) continue;
              if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                attacks++;
              }
            }
            attackCount.set(r1 * 4 + c1, attacks);
          }
    
          // Chaque reine doit attaquer et être attaquée exactement une fois
          expect([...attackCount.values()].every(count => count === 1)).toBe(true);
        });
      });
});
  