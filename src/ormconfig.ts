import * as dotenv from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from "typeorm";
import { DB_TIME_ZONE } from './common/constants';

dotenv.config();
const { DB_DIALECT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SYNC, LOGGING } = process.env;

export default {
  type: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  timezone: DB_TIME_ZONE,
  synchronize: (DB_SYNC === 'true'),
  logging: (LOGGING === 'true'),
  entities: [
    join(__dirname, '**', '*-entity.{ts,js}'),
  ],
  migrations: ["build/migration/*.js"],
  cli: {
    migrationsDir: 'src/migration',
  }
} as ConnectionOptions;