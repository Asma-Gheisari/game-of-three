import path from "path";

export default class GameService {
  public getGameFilePath() {
    return path.join(__dirname, "../..", "client", "game.html");
  }
}
