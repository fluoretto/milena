import {
  getAsync,
  setAsync,
  delAsync,
  setWithExpiryAsync,
} from "@root/services/redis";
import wordlist from "@root/services/wordlist";
import errors from "@root/types/errors";
import { Module, Service } from "@root/types";
import _ from "lodash";
import { User } from "@root/entity/User";
import jwt from "jsonwebtoken";
import { createRefreshTokenForUser } from "../user";
import getConfig from "@root/config";
import {
  isTokenExpired,
  isTokenFlooded,
  LoginToken,
  RefreshTokenData,
} from "./shared";
import { Claimer } from "@root/entity/Claimer";

/**
 * Generate random login code
 */
function getLoginCode() {
  let words = [];

  for (let i = 0; i < 4; i++) {
    words.push(wordlist.getRandomWord());
  }

  return words.join("-");
}

/**
 * Update login token fields
 * @param email User e-mail
 * @param data Fields to update
 */
async function updateLoginToken(email: string, data: Partial<LoginToken>) {
  try {
    const json = await getAsync(`login_token/${email}`);

    if (!json) {
      throw new Error("Not set");
    }

    const obj: LoginToken = JSON.parse(json);
    const newObj: LoginToken = { ...obj, ...data };

    await setAsync(`login_token/${email}`, JSON.stringify(newObj));

    return newObj;
  } catch {
    if (
      data.code !== undefined &&
      data.createdAt !== undefined &&
      data.expiresAt !== undefined &&
      data.triesLeft !== undefined
    ) {
      const expiry = Math.round((data.expiresAt - data.createdAt) / 1000);
      await setWithExpiryAsync(
        `login_token/${email}`,
        JSON.stringify(data),
        expiry
      );
      return data as LoginToken;
    }

    throw new errors.InternalError(
      "Server missed arguments when updating the token.",
      {
        originService: Service.Server,
        originModule: Module.Login,
      }
    );
  }
}

/**
 * Retrieve login token from Redis
 * @param email User e-mail
 */
export async function getLoginToken(email: string) {
  const json = await getAsync(`login_token/${email}`);

  if (!json) {
    throw new errors.FlowNotStarted("Login flow not started.", {
      originService: Service.Redis,
      originModule: Module.Login,
    });
  }

  const obj: LoginToken = JSON.parse(json);
  return obj;
}

/**
 * Create login token
 * @param email User e-mail
 */
export async function createLoginCode(email: string) {
  try {
    const token = await getLoginToken(email);

    if (isTokenExpired(token)) {
      throw new Error("Expired");
    }

    return token;
  } catch {}

  const obj = await updateLoginToken(email, {
    code: getLoginCode(),
    expiresAt: Date.now() + 10 * 60 * 1000,
    createdAt: Date.now(),
    triesLeft: 5,
  });

  return obj;
}

/**
 * Verifies if a login code check againsts user e-mail
 * @param email User e-mail
 * @param code Code to check against
 */
export async function verifyLoginCode(email: string, code: string) {
  const token = await getLoginToken(email);

  if (isTokenExpired(token)) {
    throw new errors.TokenExpired("Token expired.", {
      originService: Service.Server,
      originModule: Module.Login,
    });
  }

  if (isTokenFlooded(token)) {
    throw new errors.TokenFlooded("No tries left.", {
      originService: Service.Server,
      originModule: Module.Login,
    });
  }

  if (_.deburr(token.code) === _.deburr(code)) {
    await delAsync(`login_token/${email}`);
    return true;
  }

  await updateLoginToken(email, { triesLeft: token.triesLeft - 1 });

  throw new errors.CodeDoesntMatch("Login code doesn't match", {
    originService: Service.Server,
    originModule: Module.Login,
  });
}

/**
 * Generate 1y JWT for user
 * @param user The user to login
 */
export async function getRefreshToken(user: User, claimer: Claimer) {
  const refreshToken = await createRefreshTokenForUser(user, claimer);

  const payload: RefreshTokenData = {
    userId: user.id,
    tokenId: refreshToken.id,
    claimerId: claimer.id,
  };

  return jwt.sign(payload, getConfig().privateKey, {
    algorithm: "RS512",
    expiresIn: "1y",
  });
}

/**
 * Generate 1y JWT for user
 * @param user The user to login
 */
export function checkRefreshToken(token: string): RefreshTokenData {
  return jwt.verify(token, getConfig().publicKey) as RefreshTokenData;
}
