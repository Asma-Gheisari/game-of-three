import Game from "./game";
import GameStartError from "../../exceptions/game-start.exception";
import GameOfThreePlayer from "../player/game-of-three-player";
import MoveResult from "../move/move-result";
import { Socket } from "socket.io";

export default class GameOfThree extends Game<number, Socket> {
  readonly numberOfPlayers: number = 2;
  private players: GameOfThreePlayer[];

  start(initiator: GameOfThreePlayer, players: GameOfThreePlayer[]): void {
    this.players = players;
    this.currentPlayer = initiator;
    if (this.players.length == this.numberOfPlayers) {
      const newMove: MoveResult<number> = initiator.play();
      this.passToOpponent(newMove);
    } else {
      throw new GameStartError(
        `The game can only start with ${this.numberOfPlayers} players!`
      );
    }
  }

  private passToOpponent(move: MoveResult<number>) {
    this.currentMove = move;
    const opponent: GameOfThreePlayer | undefined = this.findOpponent();
    if (opponent) {
      this.currentPlayer = opponent;
    }
  }

  private findOpponent(): GameOfThreePlayer | undefined {
    return this.players.find((p) => p.name != this.currentPlayer.name);
  }

  playRound(): void {
    const newMove: MoveResult<number> = this.currentPlayer.play(
      this.currentMove.resultingNumber
    );
    this.passToOpponent(newMove);
  }
}
