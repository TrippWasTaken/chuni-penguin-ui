"use client";
import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import { chuniProfileData, chuniScoreBest } from "@/drizzle/schema";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import UserScore from "./userScore";
import { SongScore } from "@/types/songScore";

export default function UserPage({ params }: { params: { id: string } }) {
  const reqId = params.id;
  const {
    data: generalData,
    isLoading: generalLoading,
    error: generalErr,
  } = useSWR<typeof chuniProfileData>(
    `/api/chuni/users?chuniId=${reqId}`,
    fetcher
  );
  const id = generalData?.user;
  const {
    data: bestData,
    isLoading: bestLoading,
    error: bestErr,
  } = useSWR<SongScore[]>(`/api/chuni/users/topScores?user=${id}`, fetcher);
  console.log("best data", bestData);
  console.log("curr data to show:", generalData);
  if (bestLoading || generalLoading) return <LoadingComponent />;
  return (
    <div className="w-full p-5">
      <UserScore scores={bestData} />
    </div>
  );
}
