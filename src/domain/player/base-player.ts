import { Socket } from "socket.io";
import Client from "../client/client";
import { SocketClient } from "../client/socket-client";
import MoveStrategy from "../move/move-strategy";
import MoveResult from "../move/move-result";

export abstract class BasePlayer<T> implements SocketClient {
  protected _strategy: MoveStrategy<T>;

  constructor(
    strategy: MoveStrategy<T>,
    readonly name: string,
    readonly clientId: string,
    readonly socket: Socket
  ) {
    this._strategy = strategy;
  }

  abstract play(num: number): MoveResult<T>;
}
