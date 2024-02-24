import { pgTable, serial, text, varchar, integer, timestamp, boolean, bigint } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  password: text("password"),
  score: integer("score").notNull().default(0),
  country: varchar("country", { length: 2 }).notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const passwordResetRequests = pgTable("password_reset_requests", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  token: text("token").unique(),
  expiry: bigint("expiry", { mode: "bigint" }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


export const emailVerification = pgTable("email_verification", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  token: text("token").unique(),
  expiry: bigint("expiry", { mode: "bigint" }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  token: text("token").unique(),
  expiry: bigint("expiry", { mode: "bigint" }).notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


