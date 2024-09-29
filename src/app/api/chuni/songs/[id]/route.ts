import { db } from "@/db"
import { chuniStaticMusic } from "@/drizzle/schema"
import { and, eq, gt, inArray, like, not } from "drizzle-orm"
import { NextResponse, NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (Number(params.id)) {
    const id = parseInt(params.id)
    const song = await db
      .select()
      .from(chuniStaticMusic)
      .where(
        and(eq(chuniStaticMusic.version, 15), eq(chuniStaticMusic.songId, id))
      )

    // worlds end maps are not under the same ID for some unkown reason
    // so we need to fetch them if they exist, if the worlds end tag is Invalid
    // we'll do that by looking for the worlds end version of the map which will share the same jacketPath
    if (song[5].worldsEndTag === "Invalid" && song[5].jacketPath) {
      const worldsEndVer = await db
        .select()
        .from(chuniStaticMusic)
        .where(
          and(
            eq(chuniStaticMusic.version, 15),
            like(chuniStaticMusic.jacketPath, song[5].jacketPath),
            not(inArray(chuniStaticMusic.worldsEndTag, ["null", "Invalid"]))
          )
        )

      if (worldsEndVer[0]) {
        song.splice(5, 1, worldsEndVer[0])
      }
    }

    // remove any 0 level values IE empty ultima levels
    const filterRubbish = song.filter((item) => item.level !== 0)

    if (song.length > 0) {
      return NextResponse.json(filterRubbish, { status: 200 })
    }

    return NextResponse.json(
      { error: "seems this doesnt exist" },
      { status: 404 }
    )
  }
}
