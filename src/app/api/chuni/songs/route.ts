import { db } from "@/db"
import { chuniStaticMusic } from "@/drizzle/schema"
import { and, eq, gt, like, or } from "drizzle-orm"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const songDetail = req.nextUrl?.searchParams.get("songId")
  const displayCount = req.nextUrl?.searchParams.get("displayCount")
  const displayOffset = req.nextUrl?.searchParams.get("displayOffset")
  const numId = Number(songDetail)
  const displayLimitNumber = Number(displayCount)
  const displayOffsetNumber = Number(displayOffset)

  // filter properties
  const musicDifficulty = req.nextUrl?.searchParams.get("difficulty")
  const musicLevel = req.nextUrl?.searchParams.get("level")
  const musicGenre = req.nextUrl?.searchParams.get("genre")
  const musicQuery = req.nextUrl?.searchParams.get("query")

  if (musicGenre === "POPS-AND-ANIME") {
    musicGenre.replace("-AND-", " & ")
  }

  const musicDiffs = {
    basic: 0,
    advanced: 1,
    expert: 2,
    master: 3,
    ultima: 4,
    "worlds end": 5,
  }

  const calculatedOffset = displayLimitNumber * displayOffsetNumber

  const toFilter = []

  if (musicGenre !== "any" && musicGenre !== null) {
    console.log(musicGenre)
    toFilter.push(eq(chuniStaticMusic.genre, musicGenre))
  }

  if (musicQuery !== "") {
    toFilter.push(
      or(
        like(chuniStaticMusic.title, `%${musicQuery}%`),
        like(chuniStaticMusic.artist, `%${musicQuery}%`)
      )
    )
  }

  if (musicDifficulty !== "any" && musicDifficulty !== null) {
    switch (musicDifficulty) {
      case "basic":
        break
      case "advanced":
        break
      case "expert":
        break
      case "ultima":
        toFilter.push(eq(chuniStaticMusic.chartId, musicDiffs.ultima))
        toFilter.push(gt(chuniStaticMusic.level, 0))
        break
      case "worlds end":
        break
      default:
        break
    }
  }

  const musicList = await db
    .select()
    .from(chuniStaticMusic)
    .where(and(eq(chuniStaticMusic.version, 15), ...toFilter))
    .groupBy(chuniStaticMusic.songId)
    .limit(displayLimitNumber)
    .offset(calculatedOffset)
    .catch((err) => {
      return NextResponse.json(
        { error: `Something broke along the way ${err}` },
        { status: 500 }
      )
    })

  if (Array.isArray(musicList) && musicList.length === 0) {
    return NextResponse.json([], { status: 200 })
  }

  // This is old and no longer needed but just incase I ever do need this I'll leave it here
  // const songsBundled = []
  //
  // // we may have less than 6 maps left when getting to the end
  // // so we use musicList len other displayLimitNumber
  // // This is horrible but groupBy doesnt seem to group things properly so might need it
  // if (Array.isArray(musicList)) {
  //   for (let i = 0; i < musicList.length / 6; i++) {
  //     songsBundled.push(musicList.slice(i * 6, i * 6 + 6))
  //   }
  // }

  return NextResponse.json(musicList, { status: 200 })
}
