"use client";
import { fetcher } from "@/app/common/fetcher";
import React from "react";
import useSWR from "swr";
import { chuniStaticMusic } from "@/drizzle/schema";
import SongPanel from "./SongPanel";

export default function SongInfo({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading, error } = useSWR(
    `/api/chuni/songs?songId=${id}`,
    fetcher
  );

  const difficulties = {
    0: "BASIC",
    1: "ADVANCED",
    2: "EXPERT",
    3: "MASTER",
    ultima: "ULTIMA",
    worldsEnd: "WORLDS END",
  };

  const getDiffColor = (
    song: typeof chuniStaticMusic.$inferSelect,
    text = false
  ) => {
    switch (song.chartId) {
      // 0: "BASIC",
      // 1: "ADVANCED",
      // 2: "EXPERT",
      // 3: "MASTER",
      // ultima: "ULTIMA",
      // worldsEnd: "WORLDS END",
      case 0:
        return text ? "BASIC" : "diffBasic";
      case 1:
        return text ? "ADVANCED" : "diffAdvanced";
      case 2:
        return text ? "EXPERT" : "diffExpert";
      case 3:
        return text ? "MASTER" : "diffMaster";
      default:
        break;
    }

    if (song.chartId && song.chartId > 3) {
      if (song.worldsEndTag) return text ? "WORLDS END" : "diffWorldsEnd";
      return text ? "ULTIMA" : "diffUltima";
    }
    return null;
  };

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {data?.map((item: typeof chuniStaticMusic.$inferSelect) => {
        const colorClass = getDiffColor(item);
        const text = getDiffColor(item, true);

        return (
          <>
            <input
              type="radio"
              name="diffTabs"
              role="tab"
              className="tab .diffMaster"
              aria-label={text || "unknown"}
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box"
            >
              <SongPanel info={item} diffColor={colorClass} diffName={text} />
            </div>
          </>
        );
      })}
    </div>
  );
}
