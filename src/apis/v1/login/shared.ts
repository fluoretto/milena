export interface LoginToken {
  code: string;
  expiresAt: number;
  createdAt: number;
  triesLeft: number;
}

export interface ExchangeToken {
  uid: string;
  code: string;
  expiresAt: number;
  createdAt: number;
  triesLeft: number;
  claimerId: string;
  redirectUrl: string;
}

export interface RefreshTokenData {
  userId: string;
  tokenId: string;
  claimerId: string;
}

export const isTokenExpired = (token: LoginToken | ExchangeToken) =>
  token.expiresAt < Date.now();

export const isTokenFlooded = (token: LoginToken | ExchangeToken) =>
  token.triesLeft < 1;
