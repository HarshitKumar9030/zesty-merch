"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function Card() {
  return (
    <div className="grid grid-cols-1 mt-8 mb-8 p-4  lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Zesty Merch: Unleash Your Creativity
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            With our intuitive design platform, you can create custom T-shirts, mugs, and more. Stand out with unique, personalized products!
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1524282850895-b7921c3b241d"
          width={500}
          height={500}
          alt="custom merchandise"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Easy Customization with Canva
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Our Canva integration lets you add text, images, and other elements to your designs effortlessly. Create something truly yours!
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[320px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Join the Zesty Merch Community Today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Sign up now and start designing your custom merchandise. Whether for personal use or your business, Zesty Merch has you covered.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1507732448396-3d858da837a0"
          width={500}
          height={500}
          alt="join community"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
