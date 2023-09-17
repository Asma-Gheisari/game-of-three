import {
  MAX_GENERATED_NUMBER,
  MIN_GENERATED_NUMBER,
  POSSIBLE_MOVES,
} from "../configurations/general";
import DefaultMoveStrategy from "../domain/move/default-move-strategy";
import MoveStrategy from "../domain/move/move-strategy";

const moveStrategy: MoveStrategy<number> = new DefaultMoveStrategy(
  POSSIBLE_MOVES
);

describe("DefaultMoveStrategy", () => {
  it("should calculate a valid move result when inputNumber is provided", () => {
    const inputNumber = 10;
    const moveResult = moveStrategy.calculate(inputNumber);
    expect(moveResult.added).toBe(-1); 
    expect(moveResult.resultingNumber).toBe(3); 
  });

  it("should calculate a random move result when no inputNumber is provided", () => {
    const moveResult = moveStrategy.calculate();
    expect(moveResult.added).toBe(0);
    expect(moveResult.resultingNumber).toBeGreaterThanOrEqual(
      MIN_GENERATED_NUMBER
    );
    expect(moveResult.resultingNumber).toBeLessThanOrEqual(
      MAX_GENERATED_NUMBER
    );
  });
});
