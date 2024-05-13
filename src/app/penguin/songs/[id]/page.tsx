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

  console.log(data);
  return (
    <div role="tablist" className="tabs tabs-lifted">
      {data?.map((item: typeof chuniStaticMusic.$inferSelect) => {
        return (
          <>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Tab 1"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <SongPanel info={item} />
            </div>
          </>
        );
      })}
    </div>
  );
}
