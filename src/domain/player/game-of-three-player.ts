import { Socket } from "socket.io";
import { BasePlayer } from "./base-player";
import MoveStrategy from "../move/move-strategy";
import MoveResult from "../move/move-result";

export default class GameOfThreePlayer extends BasePlayer<number> {
  constructor(
    strategy: MoveStrategy<number>,
    readonly name: string,
    readonly clientId: string,
    readonly socket: Socket
  ) {
    super(strategy, name, clientId, socket);
  }

  play(num?): MoveResult<number> {
    return this._strategy.calculate(num);
  }
}
