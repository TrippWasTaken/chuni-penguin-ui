"use client"
import { fetcher } from "@/app/common/fetcher"
import FilterCategoryRadio from "@/app/common/global/filterCategoryRadio"
import { LoadingComponent } from "@/app/common/global/loadingComponent"
import { SearchOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import SongsListContainer from "./songsListContainer"
import useSWRInfinite from "swr/infinite"
import useSWR from "swr"
import { useInView } from "react-intersection-observer"
import { useSession } from "next-auth/react"

export default function Songs() {
  const RESULTS_COUNT = 20
  const [reachedEnd, setReachedEnd] = useState(false)
  const [filterTouched, setFilterTouched] = useState(Date.now())
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
      "worlds-end",
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
  const [query, setQuery] = useState("")
  const [debaouncedQuery, setDebaouncedQuery] = useState("")
  const [genre, setGenre] = useState(genreFilterCaterogies.values[0])
  const [played, setPlayed] = useState(playedFilterCaterogies.values[0])

  const getKey = (index: any, previousPageData: any[]) => {
    if (
      (previousPageData && previousPageData.length === 0) ||
      (previousPageData && previousPageData.length !== RESULTS_COUNT)
    ) {
      setReachedEnd(true)
      return null
    }
    return `/api/chuni/songs?displayCount=${RESULTS_COUNT}&displayOffset=${index}&genre=${genre}&played=${played}&difficulty=${difficulty}&query=${debaouncedQuery}&=${filterTouched}`
  }
  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
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

  useEffect(() => {
    setFilterTouched(Date.now())
    if (reachedEnd) {
      setReachedEnd(false)
    }
    // breaks the refreshes if you listen to the linter :(
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, genre, played, query])

  useEffect(() => {
    const handler = setTimeout(() => setDebaouncedQuery(query), 750)
    return () => {
      clearTimeout(handler)
    }
  }, [query])

  const { ref, inView } = useInView()

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined")

  const pages = data ? [].concat(...data) : []
  useEffect(() => {
    if (inView && data?.length && !reachedEnd) {
      setSize((prev) => (prev += 1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const handleOnChange = (e: any) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <div className="w-full glass bg-accent p-4">
        <label className="input input-bordered flex items-center">
          <input
            type="text"
            className="grow"
            placeholder="Type in keywords"
            value={query}
            onChange={handleOnChange}
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
              data={item}
            />
          ))}
      </div>
      <div
        className="absolute bottom-[200px] -right-11 w-6 h-6"
        ref={ref}
      />
      <div>{isLoadingMore && !reachedEnd && <LoadingComponent />}</div>
      {reachedEnd && (
        <div className="font-thin text-4xl italic w-fit m-auto p-5">
          Thats all the songs we found
        </div>
      )}
    </>
  )
}
