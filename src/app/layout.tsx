import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const fontFamily = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Penguin-UI",
  description: "Game UI and Aime switcher utility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <main className="min-h-dvh min-w-screen p-0 m-0 flex flex-col items-center justify-center relative">
          {children}
        </main>
      </body>
    </html>
  );
}
