import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import SongListComponent from "@/app/common/global/songListComponent";
import { chuniStaticMusic } from "@/drizzle/schema";
import React, { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

export default function SongsListContainer({
  data,
}: {
  data: typeof chuniStaticMusic.$inferSelect | null;
}) {
  if (!data) {
    return (
      <div>
        <button> The end</button>
      </div>
    );
  }

  return (
    <SongListComponent
      key={data.songId}
      artist={data.artist}
      jacketPath={data.jacketPath}
      genre={data.genre}
      title={data.title}
      songId={data.songId}
      worldsEndTag={data.worldsEndTag}
      diffs={0}
    />
  );
}
