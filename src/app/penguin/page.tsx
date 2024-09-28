"use client"
import React from "react"
import useSWR from "swr"
import { fetcher } from "../common/fetcher"
import { LoadingComponent } from "../common/global/loadingComponent"
import { chuniScorePlaylog } from "@/drizzle/schema"
import RecentUserAction from "../common/global/recentUserAction"

export default function Penguin() {
  const { data, isLoading, error } = useSWR<
    (typeof chuniScorePlaylog.$inferSelect)[][]
  >("/api/chuni/home", fetcher)

  if (isLoading) return <LoadingComponent />
  return (
    <div>
      <h1>Recently played</h1>
      <div className="flex flex-col gap-4">
        {data?.map((item, key) => (
          <RecentUserAction
            key={key}
            recentPlay={item}
          />
        ))}
      </div>
    </div>
  )
}
