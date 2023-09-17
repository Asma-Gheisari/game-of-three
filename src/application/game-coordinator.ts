import { Server, Socket } from "socket.io";
import { EVENT_NAME } from "../configurations/socket-events";
import GameStartError from "../exceptions/game-start.exception";
import { SocketCommunication } from "../infrastructure/socket-communication";
import { PlayerFactory } from "../domain/player/player-factory";
import Game from "../domain/game/game";
import { BasePlayer } from "../domain/player/base-player";
const cookie = require("cookie");
const { v4: uuidv4 } = require("uuid");

export default class GameCoordinator<T> extends SocketCommunication {
  connectedClients: Array<BasePlayer<T>> = [];
  private readonly playerFactory: PlayerFactory<T>;
  private readonly game: Game<BasePlayer<T>>;

  constructor(
    io: Server,
    playerFactory: PlayerFactory<T>,
    game: Game<BasePlayer<T>>
  ) {
    super(io);
    this.playerFactory = playerFactory;
    this.game = game;
    this.initializeSocketEvents();
  }

  protected initializeSocketEvents() {
    this.io.on(EVENT_NAME.Join, (socket: Socket) => {
      const player = this.initializePlayerAndCookies(socket);

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

  private handleRoundOutcome(player: BasePlayer<T>) {
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
      this.sendMessage(
        this.game.currentPlayer,
        EVENT_NAME.PlayRound,
        JSON.stringify(payload)
      );
    }
  }

  private initializePlayerAndCookies(socket: Socket): BasePlayer<T> {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    const { clientId, playerName } = this.extractClientData(cookies);

    const player = this.createPlayerWithDefaults(playerName, clientId, socket);

    this.setClientCookieIfNotPresent(socket, clientId, playerName);

    return player;
  }

  private extractClientData(cookies: Record<string, string>): {
    clientId: string;
    playerName: string;
  } {
    const playerClientData =
      cookies.playerClient && JSON.parse(cookies.playerClient);

    const clientId = playerClientData?.clientId || uuidv4();
    const playerName =
      playerClientData?.playerName ||
      `Player ${this.connectedClients.length + 1}`;

    return { clientId, playerName };
  }

  private createPlayerWithDefaults(
    playerName: string,
    clientId: string,
    socket: Socket
  ): BasePlayer<T> {
    return this.playerFactory.createPlayer(playerName, clientId, socket);
  }

  private setClientCookieIfNotPresent(
    socket: Socket,
    clientId: string,
    playerName: string
  ): void {
    if (Object.keys(socket.handshake.headers.cookie || {}).length === 0) {
      const clientData = { clientId, playerName };
      socket.emit(EVENT_NAME.SetCookie, clientData);
    }
  }
}
