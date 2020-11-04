export interface EnvConfig {
  port: string | number;
}

export interface DefaultConfig {
  dev: boolean;
  network: string;
  server: string;
}

export type Config = EnvConfig & DefaultConfig;
