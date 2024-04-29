import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import { getCharacterImagePath } from "@/app/common/utilities/getCharacterImage";
import { chuniProfileData } from "@/drizzle/schema";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import UserCard from "./userCard";
import AvatarDisplay from "./avatarDisplay";

export default function InfoPanel({
  user,
  isLoading,
}: {
  user: typeof chuniProfileData.$inferSelect;
  isLoading: boolean;
}) {
  const {
    avatarHead,
    avatarBack,
    avatarFace,
    avatarFront,
    avatarItem,
    avatarPoint,
    avatarSkin,
    avatarWear,
    charaIllustId,
    characterId,
    classEmblemBase,
    classEmblemMedal,
    firstPlayDate,
    friendCount,
    highestRating,
    lastPlaceName,
    level,
    mapIconId,
    nameplateId,
    playCount,
    playerRating,
    point,
    skillId,
    totalAdvancedHighScore,
    totalBasicHighScore,
    totalExpertHighScore,
    totalHiScore,
    totalMapNum,
    totalPoint,
    trophyId,
    userName,
    voiceId,
  } = user;
  if (isLoading) return <LoadingComponent />;
  const charaImgUrl = getCharacterImagePath(charaIllustId, "medium") as string;
  return (
    <div className="flex">
      <div className="grid grid-rows-2">
        {/*
      // might use the bigger image for something but idk
       <Image
       className="bg-white aspect-square rounded-2xl"
       src={charaImgUrl}
       alt="character Image"
       width={512}
       height={512}
      /> */}
        <UserCard
          level={level}
          userName={userName}
          playerRating={playerRating}
          highestRating={highestRating}
          charaIllustId={charaIllustId}
          nameplateId={nameplateId}
        />
        <dl className="grid grid-cols-[repeat(2,auto)] gap-x-4 w-full">
          <dt>First Played</dt> <dd>{firstPlayDate}</dd>
          <dt>Total High Score</dt> <dd>{totalHiScore?.toLocaleString()}</dd>
          <dt>Total Result</dt> <dd>{totalPoint?.toLocaleString()}</dd>
          <dt>Total Map Points</dt> <dd>{totalMapNum?.toLocaleString()}</dd>
          <dt>Play Count</dt> <dd>{playCount?.toLocaleString()}</dd>
          <dt>Friends</dt> <dd>{friendCount?.toLocaleString()}</dd>
          <dt>Last Played Location</dt> <dd>{lastPlaceName}</dd>
        </dl>
      </div>
      <AvatarDisplay
        avatarHead={avatarHead}
        avatarBack={avatarBack}
        avatarFace={avatarFace}
        avatarFront={avatarFront}
        avatarItem={avatarItem}
        avatarPoint={avatarPoint}
        avatarSkin={avatarSkin}
        avatarWear={avatarWear}
      />
    </div>
  );
}
