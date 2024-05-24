import Image from "next/image";
import React from "react";

// CHU_UI_Avatar_Tex_06100301

// common files

const bodyBase = "/static/CHU_UI_DMY_AvatarSkin.png";
const otherBase = "/static/CHU_UI_Common_Avatar_body_00.png";
const faceBase = "/static/CHU_UI_Common_Avatar_face_00.png";

export default function AvatarDisplay({
  avatarHead,
  avatarBack,
  avatarFace,
  avatarFront,
  avatarItem,
  avatarPoint,
  avatarSkin,
  avatarWear,
}: {
  avatarHead: number | null;
  avatarBack: number | null;
  avatarFace: number | null;
  avatarFront: number | null;
  avatarItem: number | null;
  avatarPoint: number | null;
  avatarSkin: number | null;
  avatarWear: number | null;
}) {
  return (
    <div className="relative w-full">
      <div
        className="relative ml-auto mr-auto h-[456px] w-[256px]"
        id="PenguinAvatarContainer"
      >
        <div className="absolute overflow-hidden z-30 w-[95px] h-[45px] top-[100px] left-[82px]">
          <Image
            className="absolute max-h-none max-w-none translate-y-[-35%] translate-x-[-37%]"
            src={otherBase}
            width={512}
            height={512}
            alt="avatar beak"
          />
        </div>
        <div className="absolute overflow-hidden z-30 w-[95px] h-[70px] top-[14px] left-[82px]">
          <Image
            className="absolute max-h-none max-w-none translate-y-[-19%] translate-x-[-37%]"
            src={otherBase}
            width={512}
            height={512}
            alt="avatar forhead"
          />
        </div>
        <div className="h-[170px] w-[256px] absolute overflow-hidden z-20 left-[16px] top-[14px]">
          <Image
            className="absolute max-h-none max-w-none"
            src={faceBase}
            width={1024}
            height={1024}
            alt="avatar face"
          />
        </div>
        <div className="absolute overflow-hidden z-30 w-[95px] h-[150px] top-[164px] left-[-56px]">
          <Image
            className="absolute max-h-none max-w-none translate-y-[0%] translate-x-[2%]"
            src={otherBase}
            width={512}
            height={512}
            alt="avatar arm left"
          />
        </div>
        <div className="absolute overflow-hidden z-30 w-[95px] h-[150px] top-[164px] right-[-56px] -scale-x-100">
          <Image
            className="absolute max-h-none max-w-none translate-y-[0%] translate-x-[2%]"
            src={otherBase}
            width={512}
            height={512}
            alt="avatar arm right"
          />
        </div>
        <div className="absolute w-[256px] h-[410px] overflow-hidden z-10">
          <Image src={bodyBase} alt="penguin body" width={256} height={512} />
        </div>
        <div className="absolute w-[70px] h-[80px] overflow-hidden bottom-0 left-[20px] z-0">
          <Image
            className="absolute translate-y-[-80%] max-h-none max-w-none"
            src={bodyBase}
            alt="penguin left foot"
            width={256}
            height={512}
          />
        </div>
        <div className="absolute w-[70px] h-[80px] overflow-hidden bottom-0 right-[20px] z-0">
          <Image
            className="absolute translate-y-[-80%] translate-x-[-38%] max-h-none max-w-none"
            src={bodyBase}
            alt="penguin right foot"
            width={256}
            height={512}
          />
        </div>
      </div>

      <Image
        className="absolute -top-[129px] left-[134px] z-50"
        src={`/static/CHU_UI_Avatar_Tex_${avatarHead
          ?.toString()
          .padStart(8, "0")}.png`}
        width={400}
        height={300}
        alt="avatar head"
      />
      <Image
        className="absolute top-[25px] left-[74px] z-50"
        src={`/static/CHU_UI_Avatar_Tex_${avatarWear
          ?.toString()
          .padStart(8, "0")}.png`}
        width={516}
        height={436}
        alt="avatar wear"
      />
      <Image
        className="absolute top-[14px] left-[215px] z-50"
        src={`/static/CHU_UI_Avatar_Tex_${avatarFace
          ?.toString()
          .padStart(8, "0")}.png`}
        width={232}
        height={208}
        alt="avatar face"
      />
    </div>
  );
}
