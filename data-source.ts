import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.dev.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, 'src', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'src', 'migrations', '*{.ts,.js}')],
  subscribers: [],
});
