const cookie = require("cookie");
import ClientData from "./client-data";

class CookieManager {
  constructor() {}

  public parseCookie(cookies: Record<string, string>): ClientData | undefined {
    const playerClientData =
      cookies.playerClient && JSON.parse(cookies.playerClient);

    const clientId = playerClientData?.clientId;
    const playerName = playerClientData?.playerName;

    if (clientId && playerName) return new ClientData(clientId, playerName);
  }
}

export default CookieManager;
