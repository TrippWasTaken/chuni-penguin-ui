import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar({ currPath }: { currPath: string }) {
  const ChuniPenguinLogoURL = "/static/CHU_UI_Character_0000_00_02.png";

  return (
    <>
      <div className="bg-primary glass absolute w-full h-1/4 z-0" />
      <div className="text-primary-content navbar max-w-screen-xl h-20 z-10 relative m-auto">
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
          <div className="avatar placeholder">
            <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 text-4xl w-20">
              WIP
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
