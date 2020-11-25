import _ from "lodash";
import { Config, DefaultConfig, EnvConfig } from "@root/types";

import getDevConfig from "./dev";
import getProdConfig from "./prod";
import { getSecret } from "@root/services/docker";

function getDefaultConfig(env: string): DefaultConfig {
  const secrets: { [key: string]: string | false } = {
    mailgun: getSecret("mailgun_apikey"),
    privateKey: getSecret("sign_private_key"),
    publicKey: getSecret("sign_public_key"),
    mysqlPassword: getSecret("mysql_password"),
  };

  for (const key in secrets) {
    if (Object.prototype.hasOwnProperty.call(secrets, key)) {
      const element = secrets[key];

      if (element === false) {
        throw new Error(`Missing or incorrect secret: ${key}.`);
      }
    }
  }

  const mailgunConfig = JSON.parse(secrets["mailgun"].toString());

  return {
    dev: env === "development",
    network: process.env.NETWORK || "None",
    server: process.env.SERVER || "None",
    dbHost: process.env.MYSQL_HOST,
    dbName: process.env.MYSQL_DATABASE,
    dbPassword: secrets["mysqlPassword"].toString(),
    redisHost: process.env.REDIS_HOST,
    emailAccount: mailgunConfig.MAILGUN_ACCOUNT,
    mailgunApiKey: mailgunConfig.MAILGUN_APIKEY,
    mailgunDomain: mailgunConfig.MAILGUN_DOMAIN,
    privateKey: secrets["privateKey"].toString(),
    publicKey: secrets["publicKey"].toString(),
  };
}

function getEnvConfig(env: string): EnvConfig {
  switch (env) {
    case "development":
      return getDevConfig();

    default:
      return getProdConfig();
  }
}

function getConfig(): Config {
  const env = process.env.NODE_ENV || "development";

  const defaultConfig = getDefaultConfig(env);
  const envConfig = getEnvConfig(env);

  return _.merge<DefaultConfig, EnvConfig>(defaultConfig, envConfig);
}

export default getConfig;
module.exports = getConfig;
