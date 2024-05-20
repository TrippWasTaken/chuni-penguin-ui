"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { FormEvent, useRef } from "react";
import { getCharacterImagePath } from "../utilities/getCharacterImage";
import Link from "next/link";

export default function NavUserIcon() {
  const ChuniNoUserURL = "/static/CHU_UI_Avatar_Icon_01300001.png";
  const { data: session, status, update } = useSession();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));

    signIn("credentials", {
      redirect: false,
      username: form.username,
      password: form.password,
    });
  };
  const formRef = useRef<HTMLFormElement>(null);

  if (session && session?.user) {
    const { charaIllustId, id } = session.user;
    const userImg = getCharacterImagePath(charaIllustId, "small");
    return (
      <div>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-round btn-ghost avatar h-20 p-0 m-0"
        >
          <Link
            href={`/penguin/users/${id}`}
            className="rounded-full h-full relative aspect-square border-base-300"
          >
            <Image
              src={userImg || ""}
              fill
              className="h-full absolute -top-2"
              alt="no user"
            />
          </Link>
        </div>
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <div className="dropdown dropdown-end p-0 m-0">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-round btn-ghost avatar h-20 p-0 m-0"
      >
        <div className="rounded-full h-full relative aspect-square border-base-300">
          <Image
            src={ChuniNoUserURL}
            fill
            className="h-full absolute -top-2"
            alt="no user"
          />
        </div>
      </div>
      <ul tabIndex={0}>
        <form
          className="flex gap-4 z-[1] mt-2 p-4 menu menu-sm bg-base-300 dropdown-content shadow-2xl rounded-box text-base-content"
          onSubmit={(e) => onSubmit(e)}
          ref={formRef}
        >
          <li>
            <label className="input input-bordered flex items-center gap-2">
              <UserOutlined />
              <input
                type="text"
                className="grow"
                placeholder="username"
                name="username"
              />
            </label>
          </li>
          <li>
            <label className="input input-info input-bordered flex items-center gap-2">
              <KeyOutlined />
              <input
                type="password"
                className="grow"
                placeholder="password"
                name="password"
              />
            </label>
          </li>
          <li>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </li>
        </form>
      </ul>
    </div>
  );
}
