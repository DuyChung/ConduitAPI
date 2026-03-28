import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import{ User } from './user.entity/user.entity';

dotenv.config({
  path: `src/config/env/.env.${process.env.NODE_ENV || 'development'}`,
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [User],
  migrations: ['src/migrations/*.ts'],

  synchronize: false,
});

export default AppDataSource;