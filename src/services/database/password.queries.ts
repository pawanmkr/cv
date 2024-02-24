import db from "../../config/postgres.js";
import { eq } from "drizzle-orm";
import { passwordResetRequests } from "../../schema.js";


export class Password {
  static async registerResetRequest(
    email: string,
    token: string,
    expiry: bigint
  ) {
    const res = await db
      .insert(passwordResetRequests)
      .values({
        email,
        token,
        expiry
      });
    return res[0];
  }

  static async findResetRequestByToken(resetToken: string) {
    const res = await db
      .select()
      .from(passwordResetRequests)
      .where(eq(passwordResetRequests.token, resetToken));

    return res[0];
  }

  static async deleteResetRequest(email: string) {
    await db
      .delete(passwordResetRequests)
      .where(eq(passwordResetRequests.email, email));
  }
}
