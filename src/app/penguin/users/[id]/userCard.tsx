//card dimensions 576 x 228

import { getCharacterImagePath } from "@/app/common/utilities/getCharacterImage";
import Image from "next/image";
import React from "react";
// CHU_UI_NamePlate_00000265

export default function UserCard({
  level,
  userName,
  playerRating,
  highestRating,
  charaIllustId,
  nameplateId,
}: {
  level: number | null;
  userName: string | null;
  playerRating: number | null;
  highestRating: number | null;
  charaIllustId: number | null;
  nameplateId: number | null;
}) {
  const nameplateImg = `/static/CHU_UI_NamePlate_${nameplateId
    ?.toString()
    .padStart(8, "0")}.png`;

  const ratingToDecimal = (num: number | null) => {
    if (!num) return 0;
    return (num / 100).toFixed(2);
  };

  const charImg = getCharacterImagePath(charaIllustId, "small") as string;
  return (
    <div className="relative w-[576px] h-[228px] m-0 p-0 flex flex-row">
      <div className="absolute text-black bottom-4 right-2 flex p-1 m-2 rounded-md bg-white bg-opacity-50">
        <div className="bg-white bg-opacity-75 absolute -top-12 h-10 w-full m-auto text-2xl font-bold rounded-xl overflow-hidden border-2 border-slate-200">
          Place Holder cus idk where these are
        </div>
        <div>
          <div className="flex">
            <div className="font-medium text-xl pr-4">
              level <span className="font-bold text-4xl">{level}</span>
            </div>
            <div className="text-4xl font-bold">{userName}</div>
          </div>
          <div className="divider h-0"></div>
          <div className="text-xl font-medium">
            Rating:
            <span className="text-4xl font-bold">
              {ratingToDecimal(playerRating)}
            </span>
            <span>({ratingToDecimal(highestRating)} highest)</span>
          </div>
        </div>
        <Image
          className="bg-slate-200 border-2 rounded-xl border-slate-500"
          width={128}
          height={128}
          src={charImg}
          alt="character image"
        />
      </div>
      <Image
        width={576}
        height={228}
        src={nameplateImg}
        alt="nameplate image"
      />
    </div>
  );
}
