import { db } from "@/db";
import { chuniProfileData } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getUserChuniProfileData = async (id: number, isUserId = false) => {
  if (!id) return null;
  if (isUserId) {
    const latestData = await db
      .select()
      .from(chuniProfileData)
      .where(eq(chuniProfileData.user, id));
    // users may have more than 1 chuni profile eg new plus -> sun plus -> luminous
    // for now only return the latest profile so the last index of data
    return latestData[latestData.length - 1];
  }

  const chuniData = await db
    .select()
    .from(chuniProfileData)
    .where(eq(chuniProfileData.id, id));
  return chuniData[0];
};
