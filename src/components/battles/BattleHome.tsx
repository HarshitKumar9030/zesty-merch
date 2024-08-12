"use client";
import React, { useState, useEffect } from "react";
import { Spotlight } from "../ui/spotlight";
import Image from "next/image";
import { BackgroundGradient } from "../ui/background-gradient";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Tabs } from "../ui/tabs";

export function BattleHome() {
  const textItems = [
    "Unleash your creativity with Zesty Merch Design Battles.",
    "Compete with fellow designers, showcase your unique style.",
    "Stand a chance to win exciting prizes.",
    "Your voice shapes the future of design.",
  ];
  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Overview</p>
          <p className="text-sm md:text-lg mt-4 text-neutral-300">
            Welcome to Zesty Merch Design Battles! Compete in creative contests,
            showcase your unique designs, and stand a chance to win amazing
            prizes. This tab gives you a quick overview of what the Design
            Battles are all about.
          </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Rules",
      value: "rules",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Rules</p>
          <p className="text-sm md:text-lg mt-4 text-neutral-200">
            Learn the guidelines for participating in the Design Battles. Follow
            the rules to ensure your designs are eligible and can compete fairly
            in the contest.
          </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Prizes",
      value: "prizes",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Prizes</p>
          <p className="text-sm md:text-lg mt-4 text-neutral-200">
            Check out the exciting prizes that you can win by participating in
            and winning the Design Battles. From exclusive merchandise to gift
            cards, there&apos;s something for everyone!
          </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Leaderboard",
      value: "leaderboard",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Leaderboard</p>
          <p className="text-sm md:text-lg mt-4 text-neutral-200">
            View the current rankings of participants in the Design Battles. See
            who&apos;s leading and get inspired by top designers.
          </p>
          <DummyContent />
        </div>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === textItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [textItems.length]);

  return (
    <>
      <div className="h-[40rem] w-full rounded-md flex lg:flex-row flex-col md:items-center md:justify-between bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <div className="text-center">
            <h3 className="text-xl md:text-3xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 tracking-wide uppercase">
              Zesty Merch presents
            </h3>
            <h1 className="mt-2 text-4xl md:text-7xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight">
              Design Battles
            </h1>
          </div>
          <div className="mt-4 font-normal text-base max-w-lg text-center mx-auto text-neutral-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {textItems[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center mt-8 mb-8 md:mb-0">
            <Link href={"#contests"}>
              <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                  <span>Browse Contests</span>
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:mr-12 transform p-6 lg:p-2 hover:skew-y-0 duration-300 skew-y-3">
          <BackgroundGradient className="rounded-lg p-1 sm:p-0.5">
            <Image
              src={"/contest_main.webp"}
              width={1200}
              height={1200}
              alt="Contest"
              className="object-contain p-1 rounded-2xl"
            />
          </BackgroundGradient>
        </div>
      </div>
      {/* <div className="bg-dot-white/15 w-full">
      <div className="h-[20rem] my-10  md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start">
        <Tabs tabClassName="text-neutral-100 mt-8" tabs={tabs} />
      </div>
      </div> */}
      
    </>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/contest_main.webp"
      alt="D"
      width={700}
      height={700}
      className="object-cover object-left-top absolute -bottom-10 inset-x-0 rounded-xl mx-auto"
    />
  );
};

const Overview = () => {
  return <></>;
};

const Rules = () => {
  return <></>;
};

const Leaderboard = () => {
  return <></>;
};

const Prices = () => {
  return <></>;
};
