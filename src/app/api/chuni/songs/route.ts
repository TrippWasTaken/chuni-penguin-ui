import { db } from "@/db";
import { chuniStaticMusic } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  //   const { title } = await req.json();

  const musicList = await db
    .select()
    .from(chuniStaticMusic)
    .groupBy(chuniStaticMusic.songId)
    .catch((err) => {
      return NextResponse.json(
        { error: `Something broke along the way ${err}` },
        { status: 500 }
      );
    });
  return NextResponse.json(musicList, { status: 200 });
}
