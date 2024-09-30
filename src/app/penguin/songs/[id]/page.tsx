"use client"
import { fetcher } from "@/app/common/fetcher"
import React, { useState } from "react"
import useSWR from "swr"
import { chuniStaticMusic } from "@/drizzle/schema"
import SongPanel from "./SongPanel"
import { LoadingComponent } from "@/app/common/global/loadingComponent"

export default function SongInfo({ params }: { params: { id: string } }) {
  const { id } = params
  const { data, isLoading, error } = useSWR(`/api/chuni/songs/${id}`, fetcher)
  const [currMap, setCurrMap] = useState(0)

  const getDiffColor = (
    song: typeof chuniStaticMusic.$inferSelect,
    text = false
  ) => {
    switch (song.chartId) {
      case 0:
        return text ? "BASIC" : "diffBasic"
      case 1:
        return text ? "ADVANCED" : "diffAdvanced"
      case 2:
        return text ? "EXPERT" : "diffExpert"
      case 3:
        return text ? "MASTER" : "diffMaster"
      case 4:
        return text ? "ULTIMA" : "diffUltima"
      case 5:
        return text ? "WORLDS END" : "diffWorldsEnd"
      default:
        return "diffBasic"
    }
  }

  if (isLoading) return <LoadingComponent />
  return (
    <div>
      <div
        role="tablist"
        className="tabs">
        {data?.map((item: typeof chuniStaticMusic.$inferSelect, i: number) => (
          <input
            key={item.chartId}
            type="radio"
            name="diffTabs"
            role="tab"
            className="tab tabs-bordered"
            aria-label={getDiffColor(item, true) || "unknown"}
            onClick={() => setCurrMap(i)}
          />
        ))}
      </div>
      <SongPanel
        info={data[currMap]}
        diffColor={getDiffColor(data[currMap])}
        diffName={getDiffColor(data[currMap], true)}
      />
    </div>
  )
}
