import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as fs from 'fs';

const envFile = fs.existsSync('test.env') ? 'test.env' : fs.existsSync('.env') ? '.env' : '.dev.env';
dotenv.config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: String(process.env.DB_PASSWORD ?? ''),
  database: process.env.DB_NAME || 'petitpotopro',
  synchronize: false,
  logging: true,
  entities: [join(__dirname, 'src', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'src', 'migrations', '*{.ts,.js}')],
  subscribers: [],
});
