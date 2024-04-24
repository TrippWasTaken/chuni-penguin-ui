import { calculateGradeFromScore } from "@/app/common/utilities/calculateGradeFromScore";
import { calculateScoreRating } from "@/app/common/utilities/calculateScoreRating";
import { sortBestScores } from "@/app/common/utilities/sortBestScores";
import { db } from "@/db";
import { chuniProfileRecentRating, chuniStaticMusic } from "@/drizzle/schema";
import { SongScore } from "@/types/songScore";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("user"));
  if (!id) {
    return NextResponse.json({ error: `Missing user ID` }, { status: 500 });
  }
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
  const parsedData: {
    musicId: string | number;
    difficultId: string | number;
    romVersionCode: string;
    score: string;
  }[] = JSON.parse(data[0].scores as string);

  // I dont actually know if the rating is game version specific but lets assume it is since we only want latest data
  const treatedVerData = parsedData.filter(
    (item) => item.romVersionCode === "2020000"
  );
  const songDataToGet = treatedVerData.map((item) => Number(item.musicId));
  const songData = await db
    .select({
      songId: chuniStaticMusic.songId,
      songChartDifficulty: chuniStaticMusic.chartId,
      songTitle: chuniStaticMusic.title,
      songArtist: chuniStaticMusic.artist,
      songBaseLevel: chuniStaticMusic.level,
      songGenre: chuniStaticMusic.genre,
      songStaticImg: chuniStaticMusic.jacketPath,
      worldsEnd: chuniStaticMusic.worldsEndTag,
    })
    .from(chuniStaticMusic)
    .where(inArray(chuniStaticMusic.songId, songDataToGet));

  // @ts-ignore lol
  const scoreDetails: SongScore[] = treatedVerData.map((item) => {
    const index = songData.findIndex((song) => {
      return (
        song.songId === Number(item.musicId) &&
        song.songChartDifficulty === Number(item.difficultId)
      );
    });
    const scoreNum = Number(item.score);
    // sometimes we might be missing some data we should in theory have
    // so return nothing if its not found
    if (index === -1) return undefined;
    return {
      scoreRating: calculateScoreRating(
        scoreNum,
        songData[index].songBaseLevel
      ),
      score: Number(item.score),
      scoreGrade: calculateGradeFromScore(scoreNum),
      ...songData[index],
    };
  });

  const sorted = sortBestScores(scoreDetails).slice(0, 10);
  return NextResponse.json(sorted, { status: 200 });
}
