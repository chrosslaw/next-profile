"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import CardModal from "../ui/CardModal";
import Header from "@/ui/Header";
import Buttons from "@/ui/Buttons";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const changeTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <main
      className={`flex flex-col md:p-4 min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-zinc-800"
          : "bg-radial-[at_20%_80%] lg:bg-radial-[at_50%_40%] from-white to-zinc-300 to-[60%]"
      }`}
    >
      <Header />
      <div className="relative w-full max-w-7xl aspect-16/9 self-center">
        {/* Daytime image */}
        <Image
          className={`w-full md:border-2 md:border-blue-400 max-w-7xl md:rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
          src="/Office.png"
          alt="Office Daytime"
          fill
          priority
        />

        {/* Nighttime image */}
        <Image
          className={`w-full md:border-2 md:border-blue-400 max-w-7xl md:rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
          src="/Office2.png"
          alt="Office Nighttime"
          fill
          priority
        />

        <div className="relative w-full h-full">
          <Buttons changeTheme={changeTheme} />
        </div>

        <CardModal open={open} setOpen={setOpen} />
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
      </div>
    </main>
  );
}
