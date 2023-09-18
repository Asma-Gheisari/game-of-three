import { Server, Socket } from "socket.io";
import { EVENT_NAME } from "../configurations/socket-events";
import GameStartError from "../exceptions/game-start.exception";
import { SocketCommunication } from "../infrastructure/socket-communication";
import { PlayerFactory } from "../domain/player/player-factory";
import Game from "../domain/game/game";
import { BasePlayer } from "../domain/player/base-player";
import { SocketMessageChannel } from "../domain/messaging/socket-message-channel";
import CookieManager from "./cookie-manager";
import ClientData from "./client-data";
const cookie = require("cookie");
const { v4: uuidv4 } = require("uuid");

export default class GameCoordinator<T> extends SocketCommunication {
  connectedClients: Array<BasePlayer<T, Socket>> = [];
  private readonly playerFactory: PlayerFactory<T, Socket>;
  private readonly game: Game<T, Socket>;
  private readonly cookieManager: CookieManager;

  constructor(
    io: Server,
    playerFactory: PlayerFactory<T, Socket>,
    game: Game<T, Socket>,
    cookieManager: CookieManager
  ) {
    super(io);
    this.playerFactory = playerFactory;
    this.game = game;
    this.cookieManager = cookieManager;
    this.initializeSocketEvents();
  }

  protected initializeSocketEvents() {
    this.io.on(EVENT_NAME.Join, (socket: Socket) => {
      const clientCookie = this.cookieManager.parseCookie(
        cookie.parse(socket.handshake.headers.cookie || "")
      );

      const player = this.initializePlayer(socket, clientCookie);

      this.setClientCookieIfNotPresent(player, clientCookie);

      this.join(player);

      this.broadcastMessage(
        EVENT_NAME.Message,
        `Welcome "${player.name}": ${socket.id}`
      );

      socket.on(EVENT_NAME.Disjoin, () => {
        if (player) this.disjoin(player);
      });

      socket.on(EVENT_NAME.PlayRound, () => {
        this.game.playRound();
        this.handleRoundOutcome(player);
      });

      socket.on(EVENT_NAME.Start, () => {
        try {
          this.game.start(player, this.connectedClients);
          this.handleRoundOutcome(player);
        } catch (error) {
          if (error instanceof GameStartError) {
            this.broadcastMessage(EVENT_NAME.StartGameError, error.message);
          }
        }
      });
    });
  }

  private handleRoundOutcome(player: BasePlayer<T, Socket>) {
    if (this.game.currentMove.resultingNumber === 1) {
      this.broadcastMessage(
        EVENT_NAME.Message,
        `"${player.name}" generated: ${JSON.stringify(this.game.currentMove)}`
      );
      this.broadcastMessage(
        EVENT_NAME.Message,
        `"${player.name}" won! Congradulation!!`
      );
    } else {
      this.broadcastMessage(
        EVENT_NAME.Message,
        `"${player.name}" generated: ${JSON.stringify(this.game.currentMove)}`
      );

      const payload = {
        playerName: player.name,
        generated: this.game.currentMove,
      };
      this.game.currentPlayer.messageChannel.sendMessage(
        EVENT_NAME.PlayRound,
        JSON.stringify(payload)
      );
    }
  }

  private initializePlayer(
    socket: Socket,
    cookie?: ClientData
  ): BasePlayer<T, Socket> {
    const clientId: string = cookie?.clientId || uuidv4();
    const playerName: string =
      cookie?.playerName || `Player ${this.connectedClients.length + 1}`;

    const player = this.playerFactory.createPlayer(
      playerName,
      clientId,
      new SocketMessageChannel(socket)
    );

    return player;
  }

  private setClientCookieIfNotPresent(
    player: BasePlayer<T, Socket>,
    clientData?: ClientData
  ): void {
    if (clientData === undefined) {
      player.messageChannel.sendMessage(
        EVENT_NAME.SetCookie,
        JSON.stringify(new ClientData(player.clientId, player.name))
      );
    }
  }
}
