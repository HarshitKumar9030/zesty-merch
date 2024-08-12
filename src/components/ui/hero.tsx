import React from "react";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import Link from 'next/link';
import Image from 'next/image'

export function Hero() {
  return (
    <BackgroundGradientAnimation className="overflow-hidden m-0 p-0">
      <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-5xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent text-4xl lg:text-8xl drop-shadow-2xl bg-gradient-to-b from-gray-300/80 to-white/20">
          Welcome To
        </p>
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-gray-300/80 to-white/20">
          Zesty Merch
        </p>
        <div className="mt-8 flex space-x-4">
          <Link href="/products">
            <p className="bg-gradient-to-r text-sm lg:text-xl pointer-events-auto from-gray-200/40 to-white/20 text-gray-900 py-2 px-5 bg-clip-border border border-transparent rounded-full ">
              Products
            </p>
          </Link>
          <Link href="/about">
            <p className="bg-gradient-to-r text-sm lg:text-xl pointer-events-auto from-gray-200/40 to-white/20 text-gray-900 py-2 px-6 bg-clip-border border-transparent border rounded-full">
              About
            </p>
          </Link>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
