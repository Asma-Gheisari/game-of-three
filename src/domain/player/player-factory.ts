import { Socket } from "socket.io";
import { BasePlayer } from "./base-player";

export interface PlayerFactory<T> {
  createPlayer(name: string, clientId: string, socket: Socket): BasePlayer<T>;
}
