import { correctPath } from "@/app/common/utilities/correctPath";
import { chuniStaticMusic } from "@/drizzle/schema";
import Image from "next/image";
import React from "react";

export default function SongPanel({
  info,
}: {
  info: typeof chuniStaticMusic.$inferSelect;
}) {
  const imgPath = correctPath(info.jacketPath);

  const getDiffColor = () => {
    switch (info.chartId) {
      // 0: "BASIC",
      // 1: "ADVANCED",
      // 2: "EXPERT",
      // 3: "MASTER",
      // ultima: "ULTIMA",
      // worldsEnd: "WORLDS END",
      case 0:
        return "diffBasic";
      case 1:
        return "diffAdvanced";
      case 2:
        return "diffExpert";
      case 3:
        return "diffMaster";
      default:
        break;
    }

    if (info.chartId && info.chartId > 3) {
      if (info.worldsEndTag) return "diffWorldsEnd";
      return "diffUltima";
    }
    return null;
  };
  return (
    <div className={`h-[300px] ${getDiffColor()} relative overflow-hidden`}>
      <div className="glass h-full w-full absolute top-0 left-[300px] z-0 opacity-50" />
      <div className="z-10 absolute w-full h-full">
        <Image
          src={imgPath}
          className=""
          height={300}
          width={300}
          alt="songImage"
        />
      </div>
    </div>
  );
}
