import { db } from "@/db";
import { chuniStaticMusic } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  //   const { title } = await req.json();

  const musicList = await db
    .select()
    .from(chuniStaticMusic)
    .where(eq(chuniStaticMusic.version, 15))
    .groupBy(chuniStaticMusic.songId)
    .catch((err) => {
      return NextResponse.json(
        { error: `Something broke along the way ${err}` },
        { status: 500 }
      );
    });
  return NextResponse.json(musicList, { status: 200 });
}
