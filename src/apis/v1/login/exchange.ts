import {
  getAsync,
  setAsync,
  delAsync,
  setWithExpiryAsync,
} from "@root/services/redis";
import errors from "@root/types/errors";
import { Module, Service } from "@root/types";
import _ from "lodash";
import crypto from "crypto";
import { ExchangeToken, isTokenExpired, isTokenFlooded } from "./shared";
import { Claimer } from "@root/entity/Claimer";

const k = (code: string) => `exchange_token/${code}`;

function getExchangeCode() {
  return crypto.randomBytes(128).toString("base64");
}

async function updateExchangeToken(code: string, data: Partial<ExchangeToken>) {
  try {
    const json = await getAsync(k(code));

    if (!json) {
      throw new Error("Not set");
    }

    const obj: ExchangeToken = JSON.parse(json);
    const newObj: ExchangeToken = { ...obj, ...data };

    await setAsync(k(code), JSON.stringify(newObj));

    return newObj;
  } catch {
    if (
      data.uid !== undefined &&
      data.code !== undefined &&
      data.triesLeft !== undefined &&
      data.createdAt !== undefined &&
      data.expiresAt !== undefined &&
      data.claimerId !== undefined
    ) {
      const expiry = Math.round((data.expiresAt - data.createdAt) / 1000);
      await setWithExpiryAsync(k(code), JSON.stringify(data), expiry);
      return data as ExchangeToken;
    }

    throw new errors.InternalError(
      "O servidor esqueceu de um argumento ao atualizar o token",
      {
        originService: Service.Server,
        originModule: Module.Login,
      }
    );
  }
}

export async function getExchangeToken(code: string) {
  const json = await getAsync(k(code));

  if (!json) {
    throw new errors.FlowNotStarted("Login flow not started.", {
      originService: Service.Redis,
      originModule: Module.Login,
    });
  }

  const obj: ExchangeToken = JSON.parse(json);
  return obj;
}

export async function verifyExchangeCode(uid: string, code: string) {
  const token = await getExchangeToken(code);

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

  if (token.uid === uid) {
    await delAsync(k(code));
    return token;
  }

  await updateExchangeToken(code, { triesLeft: token.triesLeft - 1 });

  throw new errors.CodeDoesntMatch("Login code doesn't match", {
    originService: Service.Server,
    originModule: Module.Login,
  });
}

export async function createExchangeToken(uid: string, claimer: Claimer) {
  const code = getExchangeCode();

  return await updateExchangeToken(code, {
    uid,
    code,
    triesLeft: 1,
    expiresAt: Date.now() + 3 * 60 * 1000,
    createdAt: Date.now(),
    claimerId: claimer.id,
    redirectUrl: claimer.redirectUrl,
  });
}
