import getConfig from "@root/config";
import redisLib from "redis";
import { promisify } from "util";

const config = getConfig();
const redis = redisLib.createClient(6379, config.redisHost);

export const setAsync = async (key: string, value: string) =>
  await promisify(redis.set).bind(redis)(key, value);

export const setWithExpiryAsync = async (
  key: string,
  value: string,
  seconds: number
) => await promisify(redis.setex).bind(redis)(key, seconds, value);

export const getAsync = async (key: string) =>
  await promisify(redis.get).bind(redis)(key);

export const delAsync = async (key: string) =>
  await promisify(redis.del).bind(redis)(key);

export default redis;
