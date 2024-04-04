"use client";
import React from "react";
import Card from "@/app/common/aime/card";
import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import { AimeCard } from "@/types/aime";
import useSWR from "swr";

export default function Aime() {
  const {
    data: activeCard,
    isLoading: activeLoading,
    mutate: cardUpdate,
  } = useSWR("/api/aime/active", fetcher);
  const {
    data: aimeCards,
    error,
    isLoading: aimeCardsLoading,
  } = useSWR("/api/aime", fetcher);
  if (error) return <div>Something went wrong: {error}</div>;
  if (aimeCardsLoading || activeLoading) return <LoadingComponent />;
  return (
    <div className="h-full w-full p-10">
      {aimeCards.length > 0 && activeCard ? (
        <div className="flex gap-10 w-full">
          {aimeCards.map((card: AimeCard) => (
            <Card
              isActive={activeCard === card.cardNumber}
              key={card.id}
              id={card.id}
              username={card.username}
              cardNumber={card.cardNumber}
              lastUsed={card.lastUsed}
              createdDate={card.createdDate}
              cardUpdate={cardUpdate}
            />
          ))}
        </div>
      ) : (
        <span>There seems to be no cards registered yet :(</span>
      )}
    </div>
  );
}
