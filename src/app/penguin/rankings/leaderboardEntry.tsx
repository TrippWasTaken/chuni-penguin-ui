import { ratingToDecimal } from "@/app/common/utilities/ratingToDecimal";
import Link from "next/link";
import React from "react";

export default function LeaderboardEntry({
  rankPos = 0,
  username,
  rating,
  highestRating,
  playCount,
  level,
  userId,
}: {
  userId: number;
  rankPos: number;
  username: string | null;
  rating: number | null;
  highestRating: number | null;
  playCount: number | null;
  level: number | null;
}) {
  return (
    <tr className="font-light bg-base-100">
      <td className="font-extrabold rounded-l-2xl">{rankPos} </td>
      <td>
        <Link href={`/penguin/users/${userId}`}>{username}</Link>
      </td>
      <td className="font-extrabold text-center">{ratingToDecimal(rating)}</td>
      <td className="text-center">{ratingToDecimal(highestRating)}</td>
      <td className="text-center">{playCount}</td>
      <td className="text-center rounded-r-2xl">{level}</td>
    </tr>
  );
}
