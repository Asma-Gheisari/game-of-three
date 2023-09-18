import { EVENT_NAME } from "../configurations/socket-events";
import Client from "../domain/client/client";

export interface Communication<T> {
  connectedClients: Array<Client<T>>;
  join(client: Client<T>): void;
  disjoin(client: Client<T>): void;
  sendMessage(receiver: Client<T>, event: string, message: string): void;
  broadcastMessage(event: EVENT_NAME, message: string): void;
}
