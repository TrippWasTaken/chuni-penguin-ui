import React from "react";
import { SCORE_STATUS, SCORE_COLORS } from "../utilities/globalVars";

export default function ClearBadge({
  value,
  custom = false,
  color,
}: {
  value: number | string;
  custom?: boolean;
  color?: "bronze" | "silver" | "blue" | "gold" | "max";
}) {
  const getColor = () => {
    if (!custom && typeof value === "number") {
      if (value === 0) return SCORE_COLORS.silver;
      if (value === 1) return SCORE_COLORS.gold;
      if (value > 1) return SCORE_COLORS.max;
    }
  };
  return (
    <div
      className={`${
        // colors can be hardset for potential future
        (color && SCORE_COLORS[color]) || getColor()
      } text-2xl text-center shadow-sm rounded-xl font-black min-w-10 pl-2 pr-2 uppercase text-nowrap text-outline-shadow text-white`}
    >
      {!custom && typeof value === "number" && SCORE_STATUS[value]}
      {custom && value}
    </div>
  );
}
