import MoveStrategy from "../move/move-strategy";
import MoveResult from "../move/move-result";
import { MessageChannel } from "../messaging/message-channel";
import Client from "../client/client";

export abstract class BasePlayer<T, U> implements Client<U> {
  protected strategy: MoveStrategy<T>;

  constructor(
    strategy: MoveStrategy<T>,
    readonly messageChannel: MessageChannel<U>,
    readonly name: string,
    readonly clientId: string
  ) {
    this.strategy = strategy;
  }

  abstract play(num: number): MoveResult<T>;
}
