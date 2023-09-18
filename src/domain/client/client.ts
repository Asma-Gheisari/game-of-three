import { MessageChannel } from "../messaging/message-channel";

export default interface Client<T> {
  readonly name: string;
  readonly clientId: string;
  readonly messageChannel: MessageChannel<T>;
}
