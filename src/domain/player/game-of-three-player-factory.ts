import { Socket } from "socket.io";
import MoveStrategy from "../move/move-strategy";
import { PlayerFactory } from "./player-factory";
import { BasePlayer } from "./base-player";
import GameOfThreePlayer from "./game-of-three-player";
import { MessageChannel } from "../messaging/message-channel";

export class GameOfThreePlayerFactory implements PlayerFactory<number,Socket> {
  constructor(private strategy: MoveStrategy<number>) {}

  createPlayer(
    name: string,
    clientId: string,
    messageChannel: MessageChannel<Socket>
  ): BasePlayer<number,Socket> {
    return new GameOfThreePlayer(this.strategy, messageChannel, name, clientId);
  }
}
