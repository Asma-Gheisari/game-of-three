import MoveResult from "../move/move-result";
import { BasePlayer } from "../player/base-player";

export default abstract class Game<T, U> {
  abstract readonly numberOfPlayers: number;
  currentPlayer: BasePlayer<T,U>;
  currentMove: MoveResult<T>;
  abstract playRound(): void;
  abstract start(initiator: BasePlayer<T,U>, players: BasePlayer<T,U>[]): void;
}
