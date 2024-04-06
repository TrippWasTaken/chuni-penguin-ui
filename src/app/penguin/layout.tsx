"use client";
import { HomeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "../common/global/navbar";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currPath = usePathname();
  return (
    <>
      <div className="w-full h-full">
        <Navbar currPath={currPath} />
        <main className=" m-auto relative z-10 bg-base-300 max-w-screen-xl mt-4 rounded-xl h-auto shadow-2xl">
          <div className="w-full h-20 bg-base-100 rounded-xl rounded-b-none">
            <div className="text-3xl flex relative justify-start items-center pl-10 h-full">
              <HomeOutlined />
              <div className="pl-5 relative">
                {
                  {
                    "/penguin": (
                      <>
                        <span className="ml-5">Home</span>
                        <span className="ml-5">ホーム</span>
                      </>
                    ),
                    "/penguin/songs": (
                      <>
                        <span className="ml-5">Songs</span>
                        <span className="ml-5">曲</span>
                      </>
                    ),
                    "/penguin/ranking": (
                      <>
                        <span className="ml-5">Rankings</span>
                        <span className="ml-5">ランキング</span>
                      </>
                    ),
                  }[currPath]
                }
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
