"use client";
import Image from "next/image";
import { useState } from "react";
import CardModal from "../ui/CardModal";
import Header from "@/ui/Header";
import Buttons from "@/ui/Buttons";

export default function Home() {
  const light =
    "bg-radial-[at_20%_80%] lg:bg-radial-[at_50%_40%] from-white to-zinc-300 to-[90%]";
  const dark = "bg-zinc-800 ";
  const [theme, setTheme] = useState(`${light}`);
  const [open, setOpen] = useState(false);
  const [background, setBackground] = useState("");

  const changeTheme = () => {
    (setTheme(theme === `${light}` ? `${dark}` : `${light}`),
      setBackground(theme === `${light}` ? "2" : ""));
  };

  return (
    <main className={`flex flex-col p-4 min-h-screen ${theme}`}>
      <Header />
      <div className="relative w-full max-w-7xl aspect-16/9 self-center">
        <Image
          className="border-2 border-blue-400 rounded-2xl"
          src={`/Office${background}.png`}
          alt="Office Image"
          fill={true}
          priority
        />
        <Buttons changeTheme={changeTheme} />

        <CardModal open={open} setOpen={setOpen} />
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </main>
  );
}
