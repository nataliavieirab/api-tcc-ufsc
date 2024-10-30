import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { DataSourceOptions, DataSource } from 'typeorm';

export const DbConnectionParams: DataSourceOptions = {
  synchronize: false,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/entities/*{entity.js,entity.ts}'],
  migrations: ['dist/infra/postgres/migrations/*{.js,.ts}'],
  subscribers: [],
  logging: false,
};

export const postgresDataSource = new DataSource(DbConnectionParams);
