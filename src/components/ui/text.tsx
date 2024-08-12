"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import Link from "next/link"

export function Text() {
  const words = [
    {
      text: "Customize",
      className: "text-white",
    },
    {
      text: "to",
      className: "text-white",
    },
    {
      text: "your",
      className: "text-white",
    },
    {
      text: "likes",
      className: "text-white",
    },
    {
        text: "on",
        className: "text-white",
    },
    {
      text: "Zesty Merch.",
      className: "text-pink-500 dark:text-pink-500",
    },
  ];

  return (
    <div className="h-[50rem] w-full bg-transparent mt-12 flex-col bg-grid-white/[0.025] relative flex items-center justify-center">
      
      <div className="z-20 pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth className="text-[40px] md:text-5xl lg:text-6xl" words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href={'/products'}><button className="w-40 h-10 rounded-xl bg-black border border-white  text-white text-sm">
          Products
        </button></Link>
        <Link href={'/register'}><button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
        </Link>
      </div>
    </div>
  );
}
