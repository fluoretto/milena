import { RefreshTokenData } from "@root/apis/v1/login/shared";
import { Claimer } from "@root/entity/Claimer";
import { Request, Response } from "express";

export interface EnvConfig {
  port: string | number;
}

export interface DefaultConfig {
  dev: boolean;
  network: string;
  server: string;
  dbHost: string;
  dbPassword: string;
  dbName: string;
  redisHost: string;
  emailAccount: string;
  mailgunDomain: string;
  mailgunApiKey: string;
  privateKey: string;
  publicKey: string;
}

export enum Service {
  Server = "Server",
  Redis = "Redis",
  MySQL = "MySQL",
  Unknown = "Unknown",
}

export enum Module {
  Login = "Login",
  Security = "Security",
  Unknown = "Unknown",
}

export enum PermissionLevel {
  Milena = 1 << 0,
  Write = 1 << 1,
  Read = 1 << 2,
}

export interface PublicRequest extends Request {}

export interface PublicRequestWithClaimer extends PublicRequest {
  claimer: Claimer;
}

export interface PrivateRequest extends PublicRequestWithClaimer {
  user: RefreshTokenData;
}

export interface CommonResponse extends Response {}

export type Config = EnvConfig & DefaultConfig;
