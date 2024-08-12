"use client";

import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "../ui/spotlight";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import { SparklesCore } from "../ui/sparkles";
import { TextGenerateEffect } from "../ui/text-generate-effect-2";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Link from "next/link";
import { videoUrl } from "@/constants";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../ui/text-reveal-card";
import PoweredBy from "../ui/poweredby";
import { Features } from "../ui/features";
import { ImageSlider } from "../ui/ImageComponent";
import { HeartIcon } from "@heroicons/react/solid";

export function AboutComponent() {
  const words = `Where creativity meets customization—at Zesty Merch, your style is as unique as you are!`;

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-[25rem] lg:h-[100vh] w-full flex items-center justify-center bg-black/[0.96] lg:bg-grid-white/[0.04] bg-grid-white/[0.08] relative overflow-hidden">
        <Spotlight
          className="absolute  top-[-20%] md:top-0 left-1/2 transform -translate-x-1/2 h-[150vh] md:h-[105vh] w-[120vw]"
          fill="white"
        />

        <div className="px-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 text-center">
          <div className="text-3xl md:text-6xl font-bold text-white relative z-20">
            We are{" "}
            <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Zesty Merch
            </span>
          </div>
          <div className="relative mt-4">
            {/* Gradient Lines and Sparkles */}
            <div className="relative w-full max-w-4xl mx-auto h-24">
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] blur-sm" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={250}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
          </div>
          <div className="mt-8">
            <TextGenerateEffect
              className="text-2xl md:text-4xl  text-center"
              words={words}
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-0">
        <div className="flex flex-col bg-grid-white/[0.06] overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Check this Video <br />
                  <span className="text-4xl md:text-[4rem] font-bold leading-none">
                    Out
                  </span>
                </h1>
              </>
            }
          >
            <Link
              href={videoUrl}
              target="_blank"
              className="relative flex gap-10 h-full group"
            >
              <div className="w-full mx-auto bg-transparent group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
                  <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
                  <Image
                    src="/zesty.png"
                    alt="header"
                    width={1350}
                    height={768}
                    className="h-full w-full object-cover object-center rounded-sm blur-none group-hover:blur-md transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          </ContainerScroll>
        </div>
      </div>

      {/* Text Component */}
      <div className="flex items-center justify-center p-4 bg-gradient-to-b from-purple-700 to-indigo-900 h-[30rem] rounded-2xl w-full shadow-xl">
        <TextRevealCard
          className="h-[20rem]"
          text="Creativity Unleashed"
          revealText="Innovation Redefined"
        >
          <TextRevealCardTitle>
            Unlock the Power of Your Imagination
          </TextRevealCardTitle>
          <TextRevealCardDescription>
            Discover how your creative ideas can transform into reality. Hover
            over to see what&apos;s hidden beneath.
          </TextRevealCardDescription>
        </TextRevealCard>
      </div>
      <div className="mt-2">
        <PoweredBy />
      </div>
      <div className="mt-2">
        <Features />
      </div>
      <div className="mt-8">
        <ImageSlider />
      </div>
      <div className="mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-br from-purple-700  to-indigo-900 p-6 text-center rounded-lg shadow-lg mt-10"
        >
          <div className="flex flex-col items-center justify-center">
            <HeartIcon className="h-10 w-10 text-white mb-2" />
            <p className="text-white text-lg font-semibold">
              Made with{" "}
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  color: ["#ffffff", "#ff69b4", "#ffffff"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                ❤️
              </motion.span>{" "}
              by{" "}
              <Link href="https://github.com/harshitkumar9030" target="_blank">
                <span className="text-blue-200 hover:text-blue-400 transition-colors">
                  Harshit
                </span>
              </Link>
            </p>
            <p className="text-blue-100 text-sm mt-2">
              Crafting code and creativity into every line.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
