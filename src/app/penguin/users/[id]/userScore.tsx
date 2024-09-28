import { SongScore } from "@/types/songScore"
import React from "react"
import ScoreEntry from "./scoreEntry"
import { sortBestScores } from "@/app/common/utilities/sortBestScores"
import useSWR from "swr"
import { fetcher } from "@/app/common/fetcher"

export default function UserScore({ id }: { id: string }) {
  const {
    data: bestData,
    isLoading: bestLoading,
    error: bestErr,
  } = useSWR<SongScore[]>(`/api/chuni/users/topScores?user=${id}`, fetcher)

  const {
    data: recentData,
    isLoading: recentLoading,
    error: recentErr,
  } = useSWR<SongScore[]>(`/api/chuni/users/recentScores?user=${id}`, fetcher)

  if (!bestData) return <div>Something seems to be missing...</div>

  const sortedScores = sortBestScores(bestData)
  const top40 = sortedScores.slice(0, 39)

  const recent10 = null

  return (
    <div className="w-full bg-base-100 rounded-lg">
      <div className="text-3xl font-bold p-2">Best Scores</div>
      <div className="p-4 flex gap-4 flex-col">
        <span className="text-2xl font-semibold">Recent 10</span>
        {recentData?.map((entry, i) => (
          <ScoreEntry
            key={i}
            entry={entry}
            index={i}
            stripped
          />
        ))}
      </div>
      <div className="p-4 flex gap-4 flex-col">
        <span className="text-2xl font-semibold">Top 30</span>
        {top40.map((entry, i) => (
          <ScoreEntry
            key={i}
            entry={entry}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
