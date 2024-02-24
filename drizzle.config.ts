import "dotenv/config";
import type { Config } from "drizzle-kit";

import dotenv from "dotenv"
dotenv.config();

export default {
  schema: "./src/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.POSTGRES_HOST || "localhost",
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || "games",
  },
} satisfies Config;
