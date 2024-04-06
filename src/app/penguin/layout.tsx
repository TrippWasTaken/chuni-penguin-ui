import { HomeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ChuniPenguinLogoURL = "/static/CHU_UI_Character_0000_00_02.png";
  return (
    <>
      <div className="w-full h-full">
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
            <Link href={"/penguin"} className="btn btn-ghost">
              home
            </Link>
            <Link href={"/songs"} className="btn btn-ghost">
              songs
            </Link>
            <Link href={"/songs"} className="btn btn-ghost">
              rankings
            </Link>
          </div>
          <div className="navbar-end">
            <div className="avatar placeholder">
              <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 text-4xl w-20">
                WIP
              </div>
            </div>
          </div>
        </div>
        <main className=" m-auto relative z-10 bg-base-300 max-w-screen-xl mt-4">
          <div className="w-full h-20 bg-base-100">
            <div className="text-3xl flex relative justify-start items-center pl-10 h-full">
              <HomeOutlined />
              <div className="pl-5 relative">
                <span>Home</span>
                <span className="ml-5">ホーム</span>
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
