import { Socket } from "socket.io";
import MoveStrategy from "../move/move-strategy";
import { PlayerFactory } from "./player-factory";
import { BasePlayer } from "./base-player";
import GameOfThreePlayer from "./game-of-three-player";

export class GameOfThreePlayerFactory implements PlayerFactory<number> {
  constructor(private strategy: MoveStrategy<number>) {}

  createPlayer(
    name: string,
    clientId: string,
    socket: Socket
  ): BasePlayer<number> {
    return new GameOfThreePlayer(this.strategy, name, clientId, socket);
  }
}
