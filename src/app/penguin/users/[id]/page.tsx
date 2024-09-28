"use client"
import { fetcher } from "@/app/common/fetcher"
import { LoadingComponent } from "@/app/common/global/loadingComponent"

import React from "react"
import useSWR from "swr"
import UserScore from "./userScore"
import InfoPanel from "./infoPanel"

export default function UserPage({ params }: { params: { id: string } }) {
  const reqId = params.id
  const {
    data: generalData,
    isLoading: generalLoading,
    error: generalErr,
  } = useSWR(`/api/chuni/users?chuniId=${reqId}`, fetcher)
  const id = generalData?.user as unknown as string
  if (generalLoading) return <LoadingComponent />
  return (
    <div className="w-full p-5">
      <InfoPanel
        user={generalData}
        isLoading={generalLoading}
      />
      <UserScore id={id} />
    </div>
  )
}
