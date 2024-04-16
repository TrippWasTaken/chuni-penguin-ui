import { SongScore } from "@/types/songScore";

export const sortBestScores = (scores: SongScore[]) => {
  return scores.sort((a, b) => {
    if (!a.scoreRating || !b.scoreRating) return -1;
    return b.scoreRating - a.scoreRating;
  });
};
