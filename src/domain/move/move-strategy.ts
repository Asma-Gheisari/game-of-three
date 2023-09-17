import MoveResult from "./move-result";

export default interface MoveStrategy<T> {
  possibleMoves: T[];
  calculate(inputNumber?: T): MoveResult<T>;
}
