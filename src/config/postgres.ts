import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { sql } from "drizzle-orm";

import dotenv from 'dotenv';
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

const db = drizzle(pool);
export default db;

export async function check_connection() {
  try {
    await db.execute(sql`SELECT NOW()`);
    console.log("> Database connection Successful!");

    console.log("> Running Migrations...");
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("> Migrations Complete.\n");
  } catch (error) {
    console.error("> Database connection ", error);
  }
}
