"use client";
import { AimeCard } from "@/types/aime";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useAlertState } from "@/app/context/alertContext";
import axios from "axios";
import stc from "string-to-color";

export default function Card({
  // id = 0,
  username = "No linked Username",
  cardNumber,
  createdDate,
  lastUsed,
  isActive,
  cardUpdate,
}: { cardUpdate: any } & AimeCard) {
  const cardColor = stc(username);

  const { showAlert } = useAlertState();
  const createdSplit = createdDate?.split(" ") || ["no", "data"];
  const lastSplit = lastUsed?.split(" ") || ["no", "data"];
  const cardNumberSplit = cardNumber?.match(/.{4}/g)! || [
    "null",
    "null",
    "null",
    "null",
    "null",
  ];

  const switchActive = async (isActive: boolean, cardNumber: string) => {
    if (isActive) showAlert("This card is already active", "info", 2);
    else {
      const res = await axios.put("/api/aime/active", {
        cardNumber: cardNumber,
      });
      if (res.status === 200) cardUpdate(); //revalidate active card
    }
  };
  return (
    <motion.div
      onDoubleClick={() => switchActive(isActive, cardNumber)}
      whileTap={{ scale: 1.05 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 10,
        mass: 1,
      }}
      whileHover={{ scale: 1.1 }}
      className={`p-5 rounded-3xl aspect-[3/2] w-full glass text-accent-content hover:cursor-pointer shadow-lg relative select-none`}
      style={{ backgroundColor: cardColor }}
    >
      {isActive && (
        <AnimatePresence>
          <motion.div
            initial={{ translateY: -50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -50, opacity: 0 }}
            className="badge badge-lg badge-success rounded-xl font-bold text-2xl p-4 absolute right-5 top-5"
          >
            Active
          </motion.div>
        </AnimatePresence>
      )}
      <div className="grid grid-rows-3 grid-cols-2 relative h-full">
        <div className="text-3xl font-semibold col-span-2">
          {username ?? "No user assigned"}
        </div>
        <div className="col-span-2">
          <div className="text-sm font-light">アクセスコード/Access Code</div>
          <div className="text-2xl">
            {cardNumberSplit[0]}-{cardNumberSplit[1]}-{cardNumberSplit[2]}-
            {cardNumberSplit[3]}-{cardNumberSplit[4]}
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <div className="text-sm font-light">Creation Date</div>
          <div>{createdSplit[0]}</div>
        </div>
        <div className="absolute bottom-0 right-0">
          <div className="text-sm font-light">Last Login</div>
          <div>
            {lastSplit[0]} {lastSplit[1]}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
