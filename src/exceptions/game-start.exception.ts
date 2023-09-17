export default class GameStartError extends Error {
  constructor(message) {
    super(message);
    this.name = "GameStartError";
  }
}
