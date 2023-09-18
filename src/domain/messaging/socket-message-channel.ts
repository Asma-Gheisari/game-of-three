import { Socket } from "socket.io";
import { MessageChannel } from "./message-channel";

export class SocketMessageChannel implements MessageChannel<Socket> {
  channel: Socket;
  constructor(channel: Socket) {
    this.channel = channel;
  }

  sendMessage(event: string, payload: string): void {
    this.channel.emit(event, payload);
  }
}
