import { db } from "@/db";
import { chuniStaticMusic } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const songDetail = req.nextUrl?.searchParams.get("songId");
  console.log(songDetail);
  const numId = Number(songDetail);
  if (songDetail) {
    const song = await db
      .select()
      .from(chuniStaticMusic)
      .where(
        and(
          eq(chuniStaticMusic.version, 15),
          eq(chuniStaticMusic.songId, numId)
        )
      );

    console.log(song);
    if (song.length > 0) {
      return NextResponse.json(song, { status: 200 });
    }

    return NextResponse.json(
      { error: "seems this doesnt exist" },
      { status: 404 }
    );
  }

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
