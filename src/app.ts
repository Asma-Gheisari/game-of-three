import express from "express";
import http from "http";
import { Server } from "socket.io";
import GameRouter from "./routers/game.route";
import GameController from "./controllers/game.controller";
import GameService from "./services/game.service";
import GameCoordinator from "./application/game-coordinator";
import GameOfThree from "./domain/game/game-of-three";
import { ExceptionHandlerMiddleware } from "./middlewares/exception-handler.middleware";
import { GameOfThreePlayerFactory } from "./domain/player/game-of-three-player-factory";
import DefaultMoveStrategy from "./domain/move/default-move-strategy";
import { POSSIBLE_MOVES } from "./configurations/general";

export default class ExpressApp {
  private readonly app: express.Application;
  private readonly server: http.Server;
  readonly gameCoordinator: GameCoordinator<number>;

  constructor(private readonly port: number) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
    const io = new Server(this.server);
    this.gameCoordinator = new GameCoordinator<number>(
      io,
      new GameOfThreePlayerFactory(new DefaultMoveStrategy(POSSIBLE_MOVES)),
      new GameOfThree()
    );

    this.setupMiddlewares();
    this.setupRoutes();
  }

  async start() {
    await new Promise<void>((resolve, reject) => {
      this.server.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    });
  }

  setupRoutes() {
    this.app.use(new GameRouter(new GameController(new GameService())).router);
  }

  setupMiddlewares() {
    this.app.use(express.static("client"));
    this.app.use(
      (error: Error, request: Request, response: Response, next: Function) => {
        ExceptionHandlerMiddleware.handle(error, request, response, next);
      }
    );
  }
}
