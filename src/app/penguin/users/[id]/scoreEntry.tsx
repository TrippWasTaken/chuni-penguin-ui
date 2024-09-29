import ClearBadge from "@/app/common/global/clearBadge"
import ScoreRankGrade from "@/app/common/global/scoreRankGrade"
import { correctPath } from "@/app/common/utilities/correctPath"
import { SongScore } from "@/types/songScore"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function ScoreEntry({
  entry,
  index,
  stripped = false,
}: {
  entry: SongScore
  stripped?: boolean
  index: number
}) {
  const {
    scoreGrade,
    scoreRating,
    songChartDifficulty,
    songBaseLevel,
    songStaticImg,
    clearStatus,
    isFullCombo,
    isAllJustice,
    missCount,
    maxChain,
    maxCombo,
    hasFullChain,
    score,
    songArtist,
    songTitle,
    playcount,
    songId,
  } = entry
  const DifficultyColors = ["green-500", "orange-500", "red-500", "purple-500"]
  const addPlus = Math.floor(songBaseLevel + 0.5) !== Math.floor(songBaseLevel)
  const imgSrc = correctPath(songStaticImg)

  return (
    <div
      className="w-full relative overflow-hidden rounded-lg"
      style={{ opacity: index < 29 ? 1 : 0.25 }}>
      <div
        className={`bg-${DifficultyColors[songChartDifficulty]} w-full h-2 absolute z-10 bottom-0`}
      />
      <div
        className={`bg-${DifficultyColors[songChartDifficulty]} w-2 h-full absolute z-10 bottom-0 right-0`}
      />
      <div className="w-full h-40 bg-base-200 p-2 flex flex-row relative overflow-hidden">
        <div className=" aspect-square h-full relative">
          <div className="absolute z-10 aspect-square w-12 bg-base-content text-xl text-base-300 border-2 rounded-lg border-base-300 flex justify-center items-center -top-2 -left-2 shadow-md">
            <span className="font-bold">
              {Math.floor(songBaseLevel)}
              {addPlus && "+"}
            </span>
          </div>
          <Link href={`/penguin/songs/${songId}`}>
            <Image
              src={imgSrc}
              fill
              alt={`${entry.songTitle} image`}
              className="overflow-hidden rounded-lg"
            />
          </Link>
        </div>
        <div className="w-full flex flex-col relative h-full">
          <div
            className="h-full w-full flex flex-col"
            style={{ justifyContent: stripped ? "center" : "space-between" }}>
            <div className="pl-5 font-medium text-2xl">
              {songTitle}
              <span className="text-base font-light"> - {songArtist}</span>
            </div>
            <div className="flex">
              <div className="text-4xl pl-5 font-bold">
                {score.toLocaleString()}
              </div>
              {!stripped && (
                <div className="flex ml-auto gap-2 p-1 pl-5 pr-5">
                  {clearStatus && <ClearBadge value={clearStatus} />}
                  {isFullCombo === 1 && (
                    <ClearBadge
                      custom
                      value={"Full Combo"}
                      color={"gold"}
                    />
                  )}
                  {isAllJustice === 1 && (
                    <ClearBadge
                      custom
                      value={"All Justice"}
                      color={"max"}
                    />
                  )}
                  {hasFullChain === 1 && (
                    <ClearBadge
                      custom
                      value={"Full Chain"}
                      color={"gold"}
                    />
                  )}
                </div>
              )}
            </div>
            {!stripped && (
              <div className="pl-5 flex flex-row gap-2 items-center">
                <div className="text-xl font-light">
                  Max Combo:
                  <span className="text-2xl"> {maxCombo}</span>
                </div>
                <div className="text-xl font-light">
                  Miss:
                  <span className="text-2xl"> {missCount}</span>
                </div>
                <div className="text-xl font-light">
                  Max Chain:
                  <span className="text-2xl"> {maxChain}</span>
                </div>
                <div className="text-xl font-light">
                  Play Count:
                  <span className="text-2xl"> {playcount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="class text-4xl text-nowrap font-bold pr-2">
            {scoreRating?.toFixed(2)}
            <span className="text-xl font-light">Rating</span>
          </div>
          <ScoreRankGrade grade={scoreGrade} />
        </div>
      </div>
    </div>
  )
}
