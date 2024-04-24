import { SongScore } from "@/types/songScore";

export const sortBestScores = (scores: SongScore[]) => {
  const sorted = [...scores].sort((a, b) => {
    return b.scoreRating - a.scoreRating;
  });

  return sorted;
};
