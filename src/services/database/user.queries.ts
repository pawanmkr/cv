import { eq } from "drizzle-orm";

import { users } from "../../schema.js";
import db from "../../config/postgres.js";


export class User {
  static async findExistingEmail(email: string) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user[0];
  }

  static async doesEmailAlreadyExists(email: string): Promise<boolean> {
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    return existingUser.length > 0;
  }

  static async registerNewUser(
    name: string,
    email: string,
    password: string,
    country: string
  ) {
    const user = await db
      .insert(users)
      .values({
        name,
        email,
        password,
        country
      })
      .returning();

    return user[0];
  }

  static async getUserById(id: number) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user[0];
  }

  static async updatePassword(userId: number, newPassword: string) {
    await db.update(users).set({ password: newPassword }).where(eq(users.id, userId));
  }

  static async updateEmailVerificationStatus(email: string) {
    await db
      .update(users)
      .set({ emailVerified: true })
      .where(eq(users.email, email));
  }
}