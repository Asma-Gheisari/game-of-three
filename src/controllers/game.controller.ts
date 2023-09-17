import GameService from "../services/game.service";
import { Request, Response } from "express";

export default class GameController {
  constructor(private readonly gameService: GameService) {}

  public serveGameFile(request: Request, response: Response) {
    try {
      const filePath = this.gameService.getGameFilePath();
      response.sendFile(filePath);
    } catch (error) {
      throw error;
    }
  }
}
