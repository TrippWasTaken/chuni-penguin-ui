import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavUserIcon from "./navUserIcon";

export default function Navbar({ currPath }: { currPath: string }) {
  const ChuniPenguinLogoURL = "/static/CHU_UI_Character_0000_00_02.png";

  return (
    <>
      <div className="bg-primary glass absolute w-full h-1/4 z-0" />
      <div className="text-primary-content navbar max-w-screen-xl h-20 z-[100] relative m-auto">
        <Link href="/" className="h-full navbar-start">
          <div className="h-full relative aspect-square">
            <Image
              src={ChuniPenguinLogoURL}
              alt="logo"
              fill
              className="rounded-full border border-primary-content h-full"
            />
          </div>
          <span className="text-xl font-black pl-2">CHUNITHM</span>
        </Link>

        <div className="navbar-middle">
          <ul className="menu-horizontal gap-5 flex-nowrap text-primary-content">
            <li>
              <Link href={"/penguin"}>home</Link>
            </li>
            <li>
              <Link href={"/penguin/songs"}>songs</Link>
            </li>
            <li>
              <Link href={"/penguin/rankings"}>rankings</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <NavUserIcon />
        </div>
      </div>
    </>
  );
}
