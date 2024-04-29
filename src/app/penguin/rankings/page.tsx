"use client";
import { fetcher } from "@/app/common/fetcher";
import React from "react";
import useSWR from "swr";

export default function RankingsPage() {
  const { isLoading, data, error } = useSWR("/api/chuni/rankings", fetcher);
  console.log(data);
  return (
    <table className="table">
      <tr>
        <th />
        <th />
        <th>Rating</th>
        <th>Highest rating</th>
        <th>Play Count</th>
        <th>Level</th>
      </tr>
    </table>
  );
}
