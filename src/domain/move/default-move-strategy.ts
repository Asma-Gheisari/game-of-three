import {
  MAX_GENERATED_NUMBER,
  MIN_GENERATED_NUMBER,
  POSSIBLE_MOVES,
} from "../../configurations/general";
import MoveResult from "./move-result";
import MoveStrategy from "./move-strategy";

export default class DefaultMoveStrategy implements MoveStrategy<number> {
  possibleMoves: number[] = [];

  constructor(possibleMoves: number[]) {
    this.possibleMoves = possibleMoves;
  }

  calculate(inputNumber?: number): MoveResult<number> {
    if (inputNumber) {
      const DIVISOR = 3;

      const found = this.possibleMoves.find(
        (element) => (inputNumber + element) % DIVISOR === 0
      );
      if (found === undefined)
        throw new Error("None of the possible moves are valid");

      const dividableNumber: number = found;
      const resultingNumber = (inputNumber + dividableNumber) / DIVISOR;

      return { added: dividableNumber, resultingNumber };
    }
    return {
      added: 0,
      resultingNumber:
        Math.floor(
          Math.random() * (MAX_GENERATED_NUMBER - MIN_GENERATED_NUMBER + 1)
        ) + MIN_GENERATED_NUMBER,
    };
  }
}
