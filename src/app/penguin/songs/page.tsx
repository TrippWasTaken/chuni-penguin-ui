"use client";
import { fetcher } from "@/app/common/fetcher";
import FilterCategoryRadio from "@/app/common/global/filterCategoryRadio";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import SongListComponent from "@/app/common/global/songListComponent";
import { chuniStaticMusic } from "@/drizzle/schema";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import SongsListContainer from "./songsListContainer";
import useSWRInfinite from "swr/infinite";

export default function Songs() {
  const RESULTS_COUNT = 20;
  const [displayOffset, setDisplayOffset] = useState<number>(0);

  const [reachedEnd, setReachedEnd] = useState(false);
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index, previousPageData) => {
      if (
        (previousPageData && previousPageData.length === 0) ||
        (previousPageData && previousPageData.length !== RESULTS_COUNT)
      ) {
        setReachedEnd(true);
        return null;
      }
      return `/api/chuni/songs?displayCount=${RESULTS_COUNT}&displayOffset=${index}`;
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      initialSize: 1,
      revalidateFirstPage: false,
    }
  );

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

  const scrollBottom = () => {
    if (
      Math.round(window.scrollY + window.innerHeight) >=
      window.document.body.scrollHeight
    ) {
      if (!reachedEnd) setSize((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollBottom);

    return () => {
      window.removeEventListener("scroll", scrollBottom);
    };
  }, []);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const pages = data ? [].concat(...data) : [];

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
            showing <span className="font-extrabold">{0}</span> songs
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 grid-flow-row gap-4 p-4">
        {pages.length > 0 &&
          pages.map((item, i) => <SongsListContainer key={i} data={item[0]} />)}
      </div>
      <div>{isLoadingMore && !reachedEnd && <LoadingComponent />}</div>
      {reachedEnd && (
        <div className=" font-thin text-4xl italic w-fit m-auto p-5">
          Thats all the songs we found
        </div>
      )}
    </>
  );
}
