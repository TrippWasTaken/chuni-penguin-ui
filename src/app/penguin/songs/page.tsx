"use client"
import { fetcher } from "@/app/common/fetcher"
import FilterCategoryRadio from "@/app/common/global/filterCategoryRadio"
import { LoadingComponent } from "@/app/common/global/loadingComponent"
import { SearchOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import SongsListContainer from "./songsListContainer"
import useSWRInfinite from "swr/infinite"
import { revalidateEvents } from "swr/_internal"

export default function Songs() {
  const RESULTS_COUNT = 20
  const [reachedEnd, setReachedEnd] = useState(false)
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
  }

  const genreFilterCaterogies = {
    name: "genre",
    values: [
      "any",
      "VARIETY",
      "ORIGINAL",
      "東方Project",
      "ゲキマイ",
      "niconico",
      "イロドリミドリ",
      "POPS & ANIME",
    ],
  }

  const playedFilterCaterogies = {
    name: "played",
    values: ["all", "played", "unplayed"],
  }

  // doing this with seperate states because its just easier to have it readable
  const [difficulty, setDifficulty] = useState(
    difficultyFilterCaterogies.values[0]
  )
  const [genre, setGenre] = useState(genreFilterCaterogies.values[0])

  const [played, setPlayed] = useState(playedFilterCaterogies.values[0])
  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    (index, previousPageData) => {
      const queryKey = `${difficulty}-${genre}-${played}`
      if (
        (previousPageData && previousPageData.length === 0) ||
        (previousPageData && previousPageData.length !== RESULTS_COUNT)
      ) {
        setReachedEnd(true)
        return
      }
      return `/api/chuni/songs?displayCount=${RESULTS_COUNT}&displayOffset=${index}&genre=${genre}&played=${played}&difficulty=${difficulty}_=${queryKey}`
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      initialSize: 1,
      revalidateFirstPage: false,
      revalidateAll: false,
    }
  )

  const scrollBottom = () => {
    if (
      Math.round(window.scrollY + window.innerHeight) >=
      window.document.body.scrollHeight
    ) {
      console.log(reachedEnd)
      if (!reachedEnd) setSize((prev) => prev + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollBottom)

    return () => {
      window.removeEventListener("scroll", scrollBottom)
    }
  }, [])

  useEffect(() => {
    mutate(true, undefined, { revalidate: true })
  }, [difficulty, genre, played])

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined")

  const pages = data ? [].concat(...data) : []

  return (
    <>
      <div className="w-full glass bg-accent p-4">
        <label className="input input-bordered flex items-center">
          <input
            type="text"
            className="grow"
            placeholder="Type in keywords"
          />
          <SearchOutlined />
        </label>

        <div className="text-accent-content capitalize pt-4 pb-4 pl-2">
          <div className="flex gap-5">
            <span>{difficultyFilterCaterogies.name}:</span>
            <FilterCategoryRadio
              selected={difficulty}
              category={difficultyFilterCaterogies}
              setter={setDifficulty}
            />
          </div>
          <div className="flex gap-5">
            <span>Level:</span>
          </div>
          <div className="flex gap-5">
            <span>Genre:</span>
            <FilterCategoryRadio
              selected={genre}
              category={genreFilterCaterogies}
              setter={setGenre}
            />
          </div>
          <div className="flex gap-5">
            <span>Played:</span>
            <FilterCategoryRadio
              selected={played}
              category={playedFilterCaterogies}
              setter={setPlayed}
            />
          </div>
          <div className="pt-6">
            showing <span className="font-extrabold">{pages.length}</span> songs
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 grid-flow-row gap-4 p-4">
        {pages.length > 0 &&
          pages.map((item, i) => (
            <SongsListContainer
              key={i}
              data={item[0]}
            />
          ))}
      </div>
      <div>{isLoadingMore && !reachedEnd && <LoadingComponent />}</div>
      {reachedEnd && (
        <div className=" font-thin text-4xl italic w-fit m-auto p-5">
          Thats all the songs we found
        </div>
      )}
    </>
  )
}
