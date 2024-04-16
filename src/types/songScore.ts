export interface SongScore {
  songId: number;
  songChartDifficulty: number;
  songTitle: string;
  songArtist: string;
  songBaseLevel: number;
  songGenre: string;
  songStaticImg: string;
  worldsEnd: string;
  scoreGrade: number;
  playcount: number;
  score: number;
  missCount: number;
  maxCombo: number;
  maxChain: number;
  isFullCombo: 0 | 1;
  isAllJustice: 0 | 1;
  hasFullChain: 0 | 1;
  clearStatus: number;
  scoreRating: number;
}
