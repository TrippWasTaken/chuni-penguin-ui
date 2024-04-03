import { db } from "@/db";
import { aimeCard, aimeUser } from "@/drizzle/schema";

export async function test() {
  const result = await db
    .select({
      id: aimeUser.id,
      username: aimeUser.username,
      createdDate: aimeUser.createdDate,
    })
    .from(aimeUser);
  const aime = await db.select().from(aimeCard);

  return { aime, result };
}
