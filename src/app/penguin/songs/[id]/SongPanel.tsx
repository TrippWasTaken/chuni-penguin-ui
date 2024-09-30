import { correctPath } from "@/app/common/utilities/correctPath"
import { chuniStaticMusic } from "@/drizzle/schema"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React from "react"
import BestScoreComponent from "./bestScoreComponent"

export default function SongPanel({
  info,
  diffColor,
  diffName,
}: {
  info: typeof chuniStaticMusic.$inferSelect
  diffColor: string | null
  diffName: string | null
}) {
  const { data } = useSession()
  const sessionId = data?.user.user
  const imgPath = correctPath(info.jacketPath)

  const addPlus =
    Math.floor((info.level as number) + 0.5) !==
    Math.floor(info.level as number)

  return (
    <>
      <div className={`h-[340px] relative overflow-hidden`}>
        <div className={`h-3 w-full absolute top-0 left-0 z-0 ${diffColor}`} />
        <div className="z-10 absolute w-full h-full flex justify-center items-center">
          <div className="h-[300px] aspect-square flex">
            <Image
              src={imgPath}
              className="aspect-square rounded-2xl overflow-hidden ml-4"
              height={300}
              width={300}
              alt="songImage"
            />
          </div>
          <div className="h-full w-full flex items-center">
            <div className="h-[300px] pl-4">
              <div className=" text-4xl font-bold">{info.title}</div>
              <div className="text-2xl font-medium mb-4">{info.artist}</div>

              <div className="flex flex-row">
                <div
                  className={` glass p-2 rounded-2xl ${diffColor} text-outline-shadow font-black text-4xl text-white text-center max-w-fit`}>
                  {diffName} {Math.floor(info.level || 0)}
                  {addPlus && "+"}
                </div>
                {info.worldsEndTag !== "Invalid" &&
                  info.worldsEndTag !== null && (
                    <div className="text-4xl font-black glass p-2 rounded-2xl text-center mx-4 px-2 text-white bg-red-500 text-outline-shadow">
                      {info.worldsEndTag}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {sessionId && (
        <BestScoreComponent
          songInfo={info}
          profileID={sessionId}
        />
      )}
    </>
  )
}
