"use client";
import { AimeCard } from "@/types/aime";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAlertState } from "@/app/context/alertContext";
import axios from "axios";

export default function Card({
  id = 0,
  username = "No linked Username",
  cardNumber = "N/A",
  createdDate = "N/A",
  lastUsed = "N/A",
  isActive,
  cardUpdate,
}: { cardUpdate: any } & AimeCard) {
  const { showAlert } = useAlertState();
  const createdSplit = createdDate.split(" ");
  const lastSplit = lastUsed.split(" ");
  const cardNumberSplit = cardNumber.match(/.{4}/g)!;

  const switchActive = async (isActive: boolean, cardNumber: string) => {
    if (isActive) showAlert("This card is already active", "info", 2);
    else {
      const res = await axios.put("/api/aime/active", {
        cardNumber: cardNumber,
      });
      console.log(res);
      cardUpdate();
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
      className="p-5 rounded-3xl aspect-[3/2] w-1/4 glass bg-accent text-accent-content hover:cursor-pointer shadow-lg relative select-none"
    >
      {isActive && (
        <div className="badge badge-outline badge-lg rounded-xl font-bold text-2xl p-4 absolute right-5 top-5">
          Active
        </div>
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
