"use client";
import { fetcher } from "@/app/common/fetcher";
import React from "react";
import useSWR from "swr";
import LeaderboardEntry from "./leaderboardEntry";
import { rankingEntry } from "@/types/rankings";

export default function RankingsPage() {
  const { isLoading, data, error } = useSWR<rankingEntry[]>(
    "/api/chuni/rankings",
    fetcher
  );
  console.log(data);
  return (
    <table className="table border-separate border-spacing-y-4 border-spacing-x-0 pr-4 pl-4">
      <thead>
        <tr>
          <th className="w-2" />
          <th className="w-full" />
          <th className="text-center">Rating</th>
          <th className="text-center">Highest Rating</th>
          <th className="text-center">Play Count</th>
          <th className="text-center">Level</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <LeaderboardEntry
            key={item.id}
            userId={item.id}
            username={item.username}
            rating={item.currRating}
            highestRating={item.highestRating}
            playCount={item.playCount}
            level={item.level}
            rankPos={index + 1}
          />
        ))}
      </tbody>
    </table>
  );
}
