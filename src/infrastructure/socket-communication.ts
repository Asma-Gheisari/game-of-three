import { Server, Socket } from "socket.io";
import { Communication } from "./communication";
import { EVENT_NAME } from "../configurations/socket-events";
import Client from "../domain/client/client";

export abstract class SocketCommunication
  implements Communication<Socket>
{
  connectedClients: Array<Client<Socket>> = [];
  constructor(protected readonly io: Server) {}

  join(client: Client<Socket>): void {
    this.connectedClients.push(client);
  }

  disjoin(client: Client<Socket>): void {
    const indexToRemove = this.connectedClients.findIndex(
      (item) => item.clientId === client.clientId
    );
    if (indexToRemove !== -1) {
      this.connectedClients.splice(indexToRemove, 1);
    }
  }

  sendMessage(receiver: Client<Socket>, event: string, payload: string): void {
    receiver.messageChannel.sendMessage(event, payload);
  }

  broadcastMessage(event: EVENT_NAME, message: string): void {
    this.io.emit(event, message);
  }

  protected abstract initializeSocketEvents(): void;
}
