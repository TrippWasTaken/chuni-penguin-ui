import { SongScore } from "@/types/songScore";
import React from "react";
import ScoreEntry from "./scoreEntry";
import { sortBestScores } from "@/app/common/utilities/sortBestScores";

export default function UserScore({
  scores,
}: {
  scores: SongScore[] | undefined;
}) {
  if (!scores) return <div>Something seems to be missing...</div>;
  const sortedScores = sortBestScores(scores);
  return (
    <div className="w-full bg-base-100 rounded-lg">
      <div className="text-3xl font-bold">Best Scores</div>
      <div className="p-4 flex gap-4 flex-col">
        {sortedScores.map((entry, i) => (
          <ScoreEntry key={i} entry={entry} />
        ))}
      </div>
    </div>
  );
}
