import { desc, eq } from "drizzle-orm";
import db from "../../config/postgres.js";
import { users } from "../../schema.js";


export class Player {
  static async createNewPlayerEntry(name: string, country: string) {
    const res = await db
      .insert(users)
      .values({
        name,
        country
      })
      .returning();

    return res[0];
  }

  static async getAllPlayers() {
    return await db
      .select({
        id: users.id,
        name: users.name,
        country: users.country,
        score: users.score
      })
      .from(users)
      .orderBy(desc(users.score));
  }

  static async deletePlayer(id: number) {
    await db
      .delete(users)
      .where(eq(users.id, id))
  }

  static async updatePlayer(id: number, name: string, score: number) {
    const res = await db
      .update(users)
      .set({
        name: name,
        score: score,
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        country: users.country,
        score: users.score
      });

    return res[0];
  }

  static async getPlayer(id: number) {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return res[0];
  }
};
