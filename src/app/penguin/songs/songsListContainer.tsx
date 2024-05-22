import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import SongListComponent from "@/app/common/global/songListComponent";
import { chuniStaticMusic } from "@/drizzle/schema";
import React, { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

export default function SongsListContainer({
  displayOffset,
  endReached,
}: {
  endReached: any;
  displayOffset: number;
}) {
  const { data, isLoading } = useSWRImmutable(
    `/api/chuni/songs?displayCount=${20}&displayOffset=${displayOffset}`,
    fetcher
  );

  if (isLoading) return <LoadingComponent />;
  if (data === false) {
    return (
      <div>
        <button onClick={() => endReached()}> The end</button>
      </div>
    );
  }

  return (
    <>
      {data &&
        data.map((songs: (typeof chuniStaticMusic.$inferSelect)[]) => {
          const song: typeof chuniStaticMusic.$inferSelect = songs[0];
          return (
            <SongListComponent
              key={song.songId}
              artist={song.artist}
              jacketPath={song.jacketPath}
              genre={song.genre}
              title={song.title}
              songId={song.songId}
              worldsEndTag={song.worldsEndTag}
              diffs={0}
            />
          );
        })}
    </>
  );
}
