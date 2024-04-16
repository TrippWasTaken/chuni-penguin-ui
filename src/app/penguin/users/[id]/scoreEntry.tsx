import ClearBadge from "@/app/common/global/clearBadge";
import { correctPath } from "@/app/common/utilities/correctPath";
import { SongScore } from "@/types/songScore";
import Image from "next/image";
import React from "react";

export default function ScoreEntry({ entry }: { entry: SongScore }) {
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
  } = entry;
  const DifficultyColors = ["green-500", "orange-500", "red-500", "purple-500"];
  const addPlus = Math.floor(songBaseLevel + 0.5) !== Math.floor(songBaseLevel);

  console.log(addPlus);
  const imgSrc = correctPath(songStaticImg);
  return (
    <div className="w-full relative overflow-hidden rounded-lg">
      <div
        className={`bg-${DifficultyColors[songChartDifficulty]} w-full h-2 absolute z-10 bottom-0`}
      />
      <div
        className={`bg-${DifficultyColors[songChartDifficulty]} w-2 h-full absolute z-10 bottom-0 right-0`}
      />
      <div className="w-full h-52 bg-base-200 p-2 flex flex-row relative overflow-hidden">
        <div className=" aspect-square h-full relative">
          <div className="absolute z-10 aspect-square w-12 bg-base-content text-xl text-base-300 border-2 rounded-lg border-base-300 flex justify-center items-center -top-2 -left-2 shadow-md">
            <span className="font-bold">
              {Math.floor(songBaseLevel)}
              {addPlus && "+"}
            </span>
          </div>
          <Image
            src={imgSrc}
            fill
            alt={`${entry.songTitle} image`}
            className="overflow-hidden rounded-lg"
          />
        </div>
        <div className="w-full flex flex-row relative h-full">
          <div className="h-full w-full">
            <div className="text-4xl pl-5 font-bold">
              {score.toLocaleString()}
            </div>

            <div className="flex flex-row gap-10 mt-auto pl-5">
              <div className="text-2xl font-light">
                Max Combo:
                <span className="text-3xl"> {maxCombo}</span>
              </div>
              <div className="text-2xl font-light">
                Max Chain:
                <span className="text-3xl"> {maxChain}</span>
              </div>
              <div className="text-2xl font-light">
                Miss Count:
                <span className="text-3xl"> {missCount}</span>
              </div>
            </div>

            <div className="w-full flex justify-start gap-2 p-1 pl-5">
              <ClearBadge type="status" value={clearStatus} />
              {isFullCombo === 1 && (
                <ClearBadge value={"Full Combo"} color={"gold"} />
              )}
              {isAllJustice === 1 && (
                <ClearBadge value={"All Justice"} color={"max"} />
              )}
              {hasFullChain === 1 && (
                <ClearBadge value={"Full Chain"} color={"gold"} />
              )}
            </div>
          </div>

          <div>
            <div className="class text-4xl text-nowrap font-bold pr-2">
              {scoreRating.toFixed(2)}
              <span className="text-xl font-light">Rating</span>
            </div>
            <ClearBadge type="grade" value={scoreGrade} />
          </div>
        </div>
      </div>
    </div>
  );
}
