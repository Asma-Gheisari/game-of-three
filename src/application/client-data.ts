export default class ClientData {
  readonly clientId: string;
  readonly playerName: string;

  constructor(clientId: string, playerName: string) {
    this.clientId = clientId;
    this.playerName = playerName;
  }
}
