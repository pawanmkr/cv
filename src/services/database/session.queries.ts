import db from "../../config/postgres.js";
import { eq } from "drizzle-orm";
import { sessions } from "../../schema.js";


export class Session {
  static async getSessionByUserId(id: number) {
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, id));

    return session[0];
  }

  static async grantNewSession(token: string, expiry: bigint, createdBy: number) {
    const session = await db
      .insert(sessions)
      .values({
        token,
        expiry,
        userId: createdBy
      })
      .returning();

    return session[0];
  }
}
