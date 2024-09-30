import SongListComponent from "@/app/common/global/songListComponent"
import { chuniStaticMusic } from "@/drizzle/schema"
import React from "react"

export default function SongsListContainer({
  data,
}: {
  data: typeof chuniStaticMusic.$inferSelect | null
}) {
  if (!data) {
    return
  }

  return (
    <SongListComponent
      key={data.songId}
      artist={data.artist}
      jacketPath={data.jacketPath}
      genre={data.genre}
      title={data.title}
      songId={data.songId}
    />
  )
}
