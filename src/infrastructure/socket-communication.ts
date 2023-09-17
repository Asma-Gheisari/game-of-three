import { Server } from "socket.io";
import { Communication } from "./communication";
import { SocketClient } from "../domain/client/socket-client";
import { EVENT_NAME } from "../configurations/socket-events";

export abstract class SocketCommunication
  implements Communication<SocketClient>
{
  protected connectedClients: Array<SocketClient> = [];
  constructor(protected readonly io: Server) {}

  join(client: SocketClient): void {
    this.connectedClients.push(client);
  }

  disjoin(client: SocketClient): void {
    const indexToRemove = this.connectedClients.findIndex(
      (item) => item.clientId === client.clientId
    );
    if (indexToRemove !== -1) {
      this.connectedClients.splice(indexToRemove, 1);
    }
  }

  sendMessage(receiver: SocketClient, event: string, payload: string): void {
    receiver.socket.emit(event, payload);
  }

  broadcastMessage(event: EVENT_NAME, message: string): void {
    this.io.emit(event, message);
  }

  protected abstract initializeSocketEvents(): void;
}
