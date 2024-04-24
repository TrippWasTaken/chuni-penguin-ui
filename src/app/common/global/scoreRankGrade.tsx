import { SCORE_COLORS, SCORE_GRADES } from "../utilities/globalVars";

export default function ScoreRankGrade({ grade = 0 }: { grade: number }) {
  const getColor = () => {
    if (grade > 7) return SCORE_COLORS.max;
    if (grade > 4) return SCORE_COLORS.gold;
    if (grade > 3) return SCORE_COLORS.blue;
    if (grade > 2) return SCORE_COLORS.bronze;
    if (grade < 2) return SCORE_COLORS.silver;
  };

  return (
    <div
      className={`aspect-square font-bold text-[5rem] overflow-hidden ${getColor()} 
      flex h-full justify-center items-center bg-clip-text text-transparent border-none`}
    >
      {SCORE_GRADES[grade]}
    </div>
  );
}
