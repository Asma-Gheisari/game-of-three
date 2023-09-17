import { Router } from "express";
import GameController from "../controllers/game.controller";

export default class GameRouter {
  public router: Router;

  constructor(private readonly gameController: GameController) {
    this.router = Router();
    this.router.get("/game", this.handleUserJoin);
  }

  private handleUserJoin = (request: Request, response: Response) => {
    this.gameController.serveGameFile(request, response);
  };
}
