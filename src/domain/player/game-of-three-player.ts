import { Socket } from "socket.io";
import { BasePlayer } from "./base-player";
import MoveStrategy from "../move/move-strategy";
import MoveResult from "../move/move-result";
import { SocketMessageChannel } from "../messaging/socket-message-channel";
import { MessageChannel } from "../messaging/message-channel";

export default class GameOfThreePlayer extends BasePlayer<number, Socket> {
  constructor(
    strategy: MoveStrategy<number>,
    channel: MessageChannel<Socket>,
    readonly name: string,
    readonly clientId: string
  ) {
    super(strategy, channel, name, clientId);
  }

  play(num?): MoveResult<number> {
    return this.strategy.calculate(num);
  }
}
