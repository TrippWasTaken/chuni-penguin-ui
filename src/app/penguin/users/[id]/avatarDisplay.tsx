import Image from "next/image";
import React from "react";

// CHU_UI_Avatar_Tex_06100301

// common files

const bodyBase = "/static/CHU_UI_DMY_AvatarSkin.png";
const otherBase = "/static/CHU_UI_Common_Avatar_body_00.png";
const faceBase = "/static/CHU_UI_Common_Avatar_face_00.png";

export default function AvatarDisplay({}) {
  return (
    <div className="relative h-[456px] w-[256px]" id="PenguinAvatarContainer">
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
  );
}
