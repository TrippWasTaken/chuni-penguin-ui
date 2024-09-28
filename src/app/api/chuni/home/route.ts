import { db } from "@/db"
import { chuniScorePlaylog } from "@/drizzle/schema"
import { desc } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const recentPlays = await db
    .select()
    .from(chuniScorePlaylog)
    .orderBy(desc(chuniScorePlaylog.id))
    .limit(30)
    .catch((err) => {
      console.error(err)
      return NextResponse.json(
        { error: `something went wrong` },
        { status: 500 }
      )
    })

  const grouped = []
  if (Array.isArray(recentPlays) && recentPlays.length) {
    for (let i = 0; i < recentPlays.length; i += 3) {
      grouped.push(recentPlays.slice(i, i + 3))
    }
  }

  return NextResponse.json(grouped, { status: 200 })
}
