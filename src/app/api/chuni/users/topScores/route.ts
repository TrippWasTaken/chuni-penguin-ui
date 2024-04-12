import { db } from "@/db";
import {
  chuniProfileRecentRating,
  chuniScoreBest,
  chuniStaticMusic,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("user"));
  if (!id) {
    return NextResponse.json({ error: `Missing user ID` }, { status: 500 });
  }

  const bestScoresAll = await db
    .select({
      difficulty: chuniScoreBest.level,
      playCount: chuniScoreBest.playCount,
      score: chuniScoreBest.scoreMax,
      scoreRank: chuniScoreBest.scoreRank,
      missCount: chuniScoreBest.missCount,
      maxCombo: chuniScoreBest.maxComboCount,
      isFC: chuniScoreBest.isFullCombo,
      isAJ: chuniScoreBest.isAllJustice,
      isSuccess: chuniScoreBest.isSuccess,
      maxChain: chuniScoreBest.maxChain,
      musicId: chuniScoreBest.musicId,
      chartId: chuniStaticMusic.chartId,
      musicTitle: chuniStaticMusic.title,
      musicArtist: chuniStaticMusic.artist,
      musicLevel: chuniStaticMusic.level,
      musicGenre: chuniStaticMusic.genre,
      jacketPath: chuniStaticMusic.jacketPath,
      worldsEnd: chuniStaticMusic.worldsEndTag,
    })
    .from(chuniScoreBest)
    .where(eq(chuniScoreBest.user, id))
    .leftJoin(chuniStaticMusic, eq(chuniScoreBest.musicId, chuniStaticMusic.id))
    .orderBy(chuniScoreBest.scoreRank);

  const data = await db
    .select({ scores: chuniProfileRecentRating.recentRating })
    .from(chuniProfileRecentRating)
    .where(eq(chuniProfileRecentRating.user, id));

  if (data.length === 0) {
    return NextResponse.json(
      { error: `No data for this user` },
      { status: 500 }
    );
  }

  const parsedData = JSON.parse(data[0].scores as string);

  const bestDataTreated = parsedData.map((item) => {
    return bestScoresAll.find((best) => best.musicId == Number(item.musicId));
  });

  console.log(bestDataTreated);
  console.log(id);
  return NextResponse.json(bestDataTreated, { status: 200 });
}
