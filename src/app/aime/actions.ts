import { db } from "@/db";
import { aimeUser } from "../../../drizzle/schema";

export async function test() {
  const result = await db.select().from(aimeUser);

  return result;
}
