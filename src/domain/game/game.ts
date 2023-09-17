import MoveResult from "../move/move-result";
import { BasePlayer } from "../player/base-player";

export default abstract class Game<T> {
  abstract readonly numberOfPlayers: number;
  currentPlayer: BasePlayer<number>;
  currentMove: MoveResult<number>;
  abstract playRound(): void;
  abstract start(initiator: T, players: T[]): void;
}
