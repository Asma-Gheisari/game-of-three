import { EVENT_NAME } from "../configurations/socket-events";
import Client from "../domain/client/client";

export interface Communication<T extends Client> {
  sendMessage(receiver: T, event: string, message: string): void;
  broadcastMessage(event: EVENT_NAME, message: string): void;
}
