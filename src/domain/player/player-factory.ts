import { BasePlayer } from "./base-player";
import { MessageChannel } from "../messaging/message-channel";

export interface PlayerFactory<T, U> {
  createPlayer(
    name: string,
    clientId: string,
    messageChannel: MessageChannel<U>
  ): BasePlayer<T, U>;
}
