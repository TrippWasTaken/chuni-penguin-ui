"use client";
import { fetcher } from "@/app/common/fetcher";
import React from "react";
import useSWR from "swr";

export default function SongInfo({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading, error } = useSWR(
    `/api/chuni/songs?songId=${id}`,
    fetcher
  );

  console.log(data);
  return <div>{params.id}</div>;
}
