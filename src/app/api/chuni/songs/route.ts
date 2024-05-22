import { db } from "@/db";
import { chuniStaticMusic } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const songDetail = req.nextUrl?.searchParams.get("songId");
  const displayCount = req.nextUrl?.searchParams.get("displayCount");
  const displayOffset = req.nextUrl?.searchParams.get("displayOffset");
  const numId = Number(songDetail);
  const displayLimitNumber = Number(displayCount) * 6;
  const displayOffsetNumber = Number(displayOffset);
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

    // worlds end doesnt really seem to work and all songs
    // have a chart for ultima and worlds end that will just be 0
    // so we need to remove them if thats the case
    const filterRubbish = song.filter(
      (item, i) => item.chartId && item.level !== 0
    );

    if (song.length > 0) {
      return NextResponse.json(filterRubbish, { status: 200 });
    }

    return NextResponse.json(
      { error: "seems this doesnt exist" },
      { status: 404 }
    );
  }

  console.log(displayOffsetNumber);
  const calculatedOffset = displayLimitNumber * displayOffsetNumber;

  const musicList = await db
    .select()
    .from(chuniStaticMusic)
    .where(eq(chuniStaticMusic.version, 15))
    .limit(displayLimitNumber)
    .offset(calculatedOffset)
    .catch((err) => {
      return NextResponse.json(
        { error: `Something broke along the way ${err}` },
        { status: 500 }
      );
    });

  if (musicList.length === 0) {
    return NextResponse.json(false, { status: 200 });
  }
  const songsBundled = [];

  // we may have less than 6 maps left when getting to the end
  // so we use musicList len other displayLimitNumber
  for (let i = 0; i < musicList.length / 6; i++) {
    songsBundled.push(musicList.slice(i * 6, i * 6 + 6));
  }

  return NextResponse.json(songsBundled, { status: 200 });
}
