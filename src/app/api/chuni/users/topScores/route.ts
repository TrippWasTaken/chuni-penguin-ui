import { calculateScoreRating } from "@/app/common/utilities/calculateScoreRating";
import { SongScore } from "@/types/songScore";
import { db } from "@/db";
import {
  chuniProfileRecentRating,
  chuniScoreBest,
  chuniStaticMusic,
} from "@/drizzle/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("user"));
  if (!id) {
    return NextResponse.json({ error: `Missing user ID` }, { status: 500 });
  }

  const bestAll: SongScore[] = (await db
    .select({
      songId: chuniStaticMusic.songId,
      songChartDifficulty: chuniStaticMusic.chartId,
      songTitle: chuniStaticMusic.title,
      songArtist: chuniStaticMusic.artist,
      songBaseLevel: chuniStaticMusic.level,
      songGenre: chuniStaticMusic.genre,
      songStaticImg: chuniStaticMusic.jacketPath,
      worldsEnd: chuniStaticMusic.worldsEndTag,
      scoreGrade: chuniScoreBest.scoreRank,
      playcount: chuniScoreBest.playCount,
      score: chuniScoreBest.scoreMax,
      missCount: chuniScoreBest.missCount,
      maxCombo: chuniScoreBest.maxComboCount,
      maxChain: chuniScoreBest.maxChain,
      isFullCombo: chuniScoreBest.isFullCombo,
      isAllJustice: chuniScoreBest.isAllJustice,
      hasFullChain: chuniScoreBest.fullChain,
      clearStatus: chuniScoreBest.isSuccess,
    })
    .from(chuniScoreBest)
    .where(eq(chuniScoreBest.user, id))
    .leftJoin(
      chuniStaticMusic,
      and(
        eq(chuniStaticMusic.version, 15),
        eq(chuniScoreBest.musicId, chuniStaticMusic.songId),
        eq(chuniScoreBest.level, chuniStaticMusic.chartId)
      )
    )) as unknown as SongScore[];

  // mutating to scare the react purists
  const ratingCalcList = bestAll.map((item) => {
    item.scoreRating = calculateScoreRating(item.score, item.songBaseLevel);

    return item;
  });

  return NextResponse.json(
    ratingCalcList.filter((item) => item.songTitle),
    { status: 200 }
  );
}
