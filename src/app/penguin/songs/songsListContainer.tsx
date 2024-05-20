import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import SongListComponent from "@/app/common/global/songListComponent";
import { chuniStaticMusic } from "@/drizzle/schema";
import React from "react";
import useSWRImmutable from "swr/immutable";

export default function SongsListContainer({
  displayOffset,
  setReachedEnd,
}: {
  setReachedEnd: any;
  displayOffset: number;
}) {
  const { data, isLoading } = useSWRImmutable(
    `/api/chuni/songs?displayCount=${20}&displayOffset=${displayOffset}`,
    fetcher,
    {
      onSuccess(data) {
        if (data.length <= 0) setReachedEnd(true);
      },
    }
  );

  if (isLoading) return <LoadingComponent />;
  return (
    <>
      {data.map((songs: (typeof chuniStaticMusic.$inferSelect)[]) => {
        const song: typeof chuniStaticMusic.$inferSelect = songs[0];
        if (!song?.songId) {
          return <div key={0}>Looks like you reached the end</div>;
        }
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
