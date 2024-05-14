"use client";
import { fetcher } from "@/app/common/fetcher";
import FilterCategoryRadio from "@/app/common/global/filterCategoryRadio";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import SongListComponent from "@/app/common/global/songListComponent";
import { chuniStaticMusic } from "@/drizzle/schema";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import React from "react";
import useSWR from "swr";

export default function Songs() {
  const { data, isLoading, error } = useSWR("/api/chuni/songs", fetcher);

  // hardcoded for now because I want to get the general dash done up
  // before making it unbreakable
  const difficultyFilterCaterogies = {
    name: "difficulty",
    values: [
      "any",
      "basic",
      "advanced",
      "expert",
      "master",
      "ultima",
      "worlds end",
    ],
  };

  const genreFilterCaterogies = {
    name: "genre",
    values: [
      "any",
      "variety",
      "original",
      "東方Project",
      "ゲキマイ",
      "niconico",
      "イロドリミドリ",
      "POPS & ANIME",
    ],
  };

  const playedFilterCaterogies = {
    name: "played",
    values: ["all", "played", "unplayed"],
  };

  if (error) return <div>Something went wrong: {error}</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <div className="w-full glass bg-accent p-4">
        <label className="input input-bordered flex items-center">
          <input type="text" className="grow" placeholder="Type in keywords" />
          <SearchOutlined />
        </label>

        <div className="text-accent-content capitalize pt-4 pb-4 pl-2">
          <div className="flex gap-5">
            <span>{difficultyFilterCaterogies.name}:</span>
            <FilterCategoryRadio
              category={difficultyFilterCaterogies}
              setter={() => null}
            />
          </div>
          <div className="flex gap-5">
            <span>Level:</span>
          </div>
          <div className="flex gap-5">
            <span>Genre:</span>
            <FilterCategoryRadio
              category={genreFilterCaterogies}
              setter={() => null}
            />
          </div>
          <div className="flex gap-5">
            <span>Played:</span>
            <FilterCategoryRadio
              category={playedFilterCaterogies}
              setter={() => null}
            />
          </div>
          <div className="pt-6">
            showing <span className="font-extrabold">{data.length}</span> songs
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 grid-flow-row gap-4 p-4">
        {data.map((song: typeof chuniStaticMusic.$inferSelect) => (
          <SongListComponent
            key={song.songId}
            artist={song.artist}
            jacketPath={song.jacketPath}
            genre={song.genre}
            title={song.title}
            songId={song.songId}
            worldsEndTag={song.worldsEndTag}
          />
        ))}
      </div>
    </>
  );
}
