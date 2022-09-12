import path from 'path';
import { config as dotenvConfig } from 'dotenv';

export interface Config {
  app: {
    port: number;
    profile: string;
  };
  databaseURL: string;
  redisURL: string;
}

export function loadConfig(): Config {
  const result = dotenvConfig({
    path: path.join(__dirname, '..', '..', '.env'),
  }).parsed;

  if (result === undefined) {
    throw new Error('loadConfig undefined');
  }

  if (result.error) {
    throw new Error(result.error);
  }
  return {
    app: {
      port: parseInt(result.PORT),
      profile: result.RUNTIME_PROFILE,
    },
    databaseURL: result.DATABASE_URL,
    redisURL: result.REDIS_URL,
  };
}
