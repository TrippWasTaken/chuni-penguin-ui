import React from "react";

export default function ClearBadge({
  value,
  type,
  color,
}: {
  value: number | string;
  type?: "grade" | "status";
  color?: "bronze" | "silver" | "blue" | "gold" | "max";
}) {
  const grades = [
    "D",
    "C",
    "B",
    "BB",
    "BBB",
    "A",
    "AA",
    "AAA",
    "S",
    "S+",
    "SS",
    "SS+",
    "SSS",
    "SSS+",
  ];

  const status = [
    "Fail",
    "Clear",
    "Hard",
    "Absolute",
    "Absolute+",
    "Absolute++",
    "Catastrophy",
  ];

  const colors = {
    bronze: "chuni-bronze-gradient",
    silver: "chuni-silver-gradient",
    blue: "chuni-blue-gradient",
    gold: "chuni-gold-gradient",
    max: "chuni-max-gradient",
  };

  const getColor = () => {
    if (type === "grade" && typeof value === "number") {
      if (value > 7) return colors.max;
      if (value > 4) return colors.gold;
      if (value > 3) return colors.blue;
      if (value > 2) return colors.bronze;
      if (value < 2) return colors.silver;
    }

    if (type === "status" && typeof value === "number") {
      if (value === 0) return colors.silver;
      if (value === 1) return colors.gold;
      if (value > 1) return colors.max;
    }
  };
  return (
    <div
      className={`${
        (color && colors[color]) || getColor()
      } text-2xl text-center shadow-sm rounded-xl font-black min-w-10 pl-2 pr-2 uppercase text-nowrap`}
    >
      {type === "grade" && typeof value === "number" && grades[value]}
      {type === "status" && typeof value === "number" && status[value]}
      {!type && value}
    </div>
  );
}
