import { db } from "@/db";
import { chuniProfileData } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const users = await db
    .select({
      id: chuniProfileData.user,
      username: chuniProfileData.userName,
      currRating: chuniProfileData.playerRating,
      highestRating: chuniProfileData.highestRating,
      playCount: chuniProfileData.playCount,
      level: chuniProfileData.level,
    })
    .from(chuniProfileData)
    .where(eq(chuniProfileData.version, 15))
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { error: `something went wrong` },
        { status: 500 }
      );
    });
  //@ts-ignore
  const sortedUsers = users.sort((a, b) => {
    return b.currRating - a.currRating;
  });

  return NextResponse.json(sortedUsers, { status: 200 });
}
