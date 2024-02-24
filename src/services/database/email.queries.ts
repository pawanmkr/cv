import db from "../../config/postgres.js";
import { eq } from "drizzle-orm";
import { emailVerification } from "../../schema.js";

export class EmailVerification {
  static async saveEmailForVerification(
    email: string,
    token: string,
    expiry: bigint
  ) {
    const res = await db
      .insert(emailVerification)
      .values({
        email,
        token,
        expiry,
      });

    return res[0];
  }

  static async findEmailVerificationRequestByToken(emailVerificationToken: string) {
    const res = await db
      .select()
      .from(emailVerification)
      .where(eq(emailVerification.token, emailVerificationToken));
    return res[0];
  }

  static async deleteEmailVerificationRequest(email: string) {
    await db
      .delete(emailVerification)
      .where(eq(emailVerification.email, email));
  }
}
