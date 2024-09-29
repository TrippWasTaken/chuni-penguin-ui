import { fetcher } from "@/app/common/fetcher"
import ScoreRankGrade from "@/app/common/global/scoreRankGrade"
import { chuniScoreBest, chuniStaticMusic } from "@/drizzle/schema"
import { SongScore } from "@/types/songScore"
import React, { FC } from "react"
import useSWR from "swr"

const BestScoreComponent: FC<{
  profileID: number
  songInfo: typeof chuniStaticMusic.$inferSelect
}> = ({ profileID, songInfo }) => {
  console.log(songInfo)
  const { data, isLoading, error } = useSWR<typeof chuniScoreBest.$inferSelect>(
    `/api/chuni/users/topScores/${songInfo.songId}?user=${profileID}&chart=${songInfo.chartId}`,
    fetcher
  )

  if (!data) return <div>You havent played this map yet</div>

  const {
    isAllJustice,
    isFullCombo,
    maxComboCount,
    scoreMax,
    missCount,
    ext1,
    playCount,
    isSuccess,
    scoreRank,
  } = data

  return (
    <div className="px-10 py-4 w-full bg-base-100 border-xl relative">
      <span className="text-xl">Your best</span>
      <div className="flex flex-row">
        <div className="">
          <ScoreRankGrade grade={scoreRank || 0} />
        </div>
        <div>
          <div className="text-4xl pl-5 font-bold">
            {scoreMax?.toLocaleString()}
          </div>
          <div className="pl-5 flex flex-row gap-2 items-center">
            <div className="text-xl font-light">
              Max Combo:
              <span className="text-2xl"> {maxComboCount}</span>
            </div>
            <div className="text-xl font-light">
              Miss:
              <span className="text-2xl"> {missCount}</span>
            </div>
            <div className="text-xl font-light">
              Play Count:
              <span className="text-2xl"> {playCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestScoreComponent
