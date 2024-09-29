import { db } from "@/db"
import { chuniScoreBest, chuniStaticMusic } from "@/drizzle/schema"
import { SongScore } from "@/types/songScore"
import { and, eq, gt, inArray, like, not } from "drizzle-orm"
import { NextResponse, NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = req.nextUrl?.searchParams.get("user")
  const chartId = req.nextUrl?.searchParams.get("chart")

  console.log(chartId)
  if (userId && chartId) {
    const userToNum = parseInt(userId)
    const chartToNum = parseInt(chartId)
    const songIdToNum = parseInt(params.id)

    const bestScore = await db
      .select()
      .from(chuniScoreBest)
      .where(
        and(
          eq(chuniScoreBest.musicId, songIdToNum),
          eq(chuniScoreBest.user, userToNum),
          eq(chuniScoreBest.level, chartToNum)
        )
      )

    if (bestScore[0]) return NextResponse.json(bestScore[0], { status: 200 })

    return NextResponse.json(null, { status: 200 })
  }

  return NextResponse.json(
    { error: "seems this doesnt exist" },
    { status: 404 }
  )
}
