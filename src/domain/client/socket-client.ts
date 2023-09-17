import { Socket } from "socket.io";
import Client from "./client";

export interface SocketClient extends Client {
  readonly socket: Socket;
}
