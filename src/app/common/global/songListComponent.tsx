import { chuniStaticMusic } from "@/drizzle/schema"
import React, { useState } from "react"
import { correctPath } from "../utilities/correctPath"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function SongListComponent({
  songId,
  title,
  artist,
  genre,
  jacketPath,
}: Partial<typeof chuniStaticMusic.$inferSelect>) {
  const imgPath = correctPath(jacketPath)
  const [isHover, setHover] = useState<boolean>(false)

  return (
    <Link href={`/penguin/songs/${songId}`}>
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className="w-full h-[10rem] overflow-hidden rounded-xl relative hover:cursor-pointer">
        <motion.img
          className="aspect-square w-full absolute z-0 -top-full opacity-20 blur-[6px]"
          initial={{ scale: 1 }}
          animate={{ scale: isHover ? 1.05 : 1 }}
          transition={{
            ease: "easeIn",
            duration: 0.1,
          }}
          src={imgPath}
          width={512}
          height={512}
          alt="BGSongImage"
          loading="lazy"
        />
        <div className="w-full h-full flex">
          <div className="aspect-square h-full relative">
            <Image
              src={imgPath}
              alt="songImage"
              width={512}
              height={512}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-start pl-4 text-base-content z-20 w-full relative">
            <span className="text-2xl font-bold">{title}</span>
            <span className="font-light">by {artist}</span>
            <div className=" bottom-0 absolute pb-4 font-semibold">
              <span className="badge rounded-2xl bg-accent text-accent-content shadow-sm text-xl p-4">
                {genre}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
