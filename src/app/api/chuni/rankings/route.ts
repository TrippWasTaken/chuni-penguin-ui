import { db } from "@/db";
import { chuniProfileData } from "@/drizzle/schema";
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
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { error: `something went wrong` },
        { status: 500 }
      );
    });

  return NextResponse.json(users, { status: 200 });
}
