"use client";
import React, { useRef } from "react";
import Card from "@/app/common/aime/card";
import { fetcher } from "@/app/common/fetcher";
import { LoadingComponent } from "@/app/common/global/loadingComponent";
import { AimeCard } from "@/types/aime";
import useSWR from "swr";
import { PlusCircleOutlined } from "@ant-design/icons";
import NewCardForm from "./newCardForm";

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
  const modalRef = useRef<HTMLDialogElement | null>(null);

  if (error) return <div>Something went wrong: {error}</div>;
  if (aimeCardsLoading || activeLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col h-full w-full p-10 relative overflow-x-hidden">
      {aimeCards.length > 0 && activeCard ? (
        <div className="flex-1 w-full grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 auto-rows-auto gap-10 z-0">
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

      <div className="flex justify-end w-full z-10 sticky bottom-0">
        <button
          className="btn btn-primary w-full lg:w-auto"
          onClick={() => {
            if (modalRef.current) modalRef.current.showModal();
          }}
        >
          <PlusCircleOutlined /> Add new card
        </button>
      </div>

      <dialog
        id="add_new_modal"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <h1 className="font-bold text-lg pb-5">Add new card</h1>
          <NewCardForm />
        </div>
      </dialog>
    </div>
  );
}
