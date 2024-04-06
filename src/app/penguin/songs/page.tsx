"use client";
import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import SongListComponent from "@/app/common/global/songListComponent";
import { chuniStaticMusic } from "@/drizzle/schema";
import axios from "axios";
import React from "react";
import useSWR from "swr";

export default function Songs() {
  const getSongs: typeof chuniStaticMusic | any = async () => {
    const songs = await axios.get("/api/chuni/songs").then((res) => res.data);
    return songs;
  };

  const { data, isLoading, error } = useSWR("/api/chuni/songs", fetcher);

  if (error) return <div>Something went wrong: {error}</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="w-full grid grid-cols-2 grid-flow-row gap-4 p-4">
      {data.map((song: typeof chuniStaticMusic.$inferSelect) => (
        <SongListComponent
          key={song.songId}
          artist={song.artist}
          jacketPath={song.jacketPath}
          genre={song.genre}
          title={song.title}
          songId={song.songId}
        />
      ))}
    </div>
  );
}
