import Link from "next/link";

export default function Home() {
  const homeBtn = (text: string, linksTo: string = "#") => {
    return (
      <Link href={linksTo}>
        <button className="btn btn-wide rounded-btn btn-default text-4xl h-auto p-6">
          {text}
        </button>
      </Link>
    );
  };
  return (
    <div className="artborad bg-neutral rounded-3xl flex flex-col aspect-square h-1/2 items-center justify-center gap-10">
      {homeBtn("Aime Switcher", "/aime")}
      {homeBtn("Penguin Dashboard", "/penguin")}
    </div>
  );
}
