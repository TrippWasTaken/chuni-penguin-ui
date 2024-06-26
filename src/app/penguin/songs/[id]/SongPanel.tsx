import { correctPath } from "@/app/common/utilities/correctPath";
import { chuniStaticMusic } from "@/drizzle/schema";
import Image from "next/image";
import React from "react";

export default function SongPanel({
  info,
  diffColor,
  diffName,
}: {
  info: typeof chuniStaticMusic.$inferSelect;
  diffColor: string | null;
  diffName: string | null;
}) {
  const imgPath = correctPath(info.jacketPath);

  return (
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

            <div
              className={` glass p-2 rounded-2xl ${diffColor} text-outline-shadow font-black text-4xl text-white text-center max-w-fit`}
            >
              {diffName} {info.level}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
