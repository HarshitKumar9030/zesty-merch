"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";
import Link from "next/link";

export function ImageSlider() {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50/80 to-neutral-400 py-4">
          Welcome to the Zesty Experience <br /> Where Creativity Meets Style
        </motion.p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <Link href="/products">
            <button className="px-4 py-2 backdrop-blur-sm border bg-purple-300/10 border-purple-500/20 text-white text-center rounded-full relative">
              <span>Explore Our Collection →</span>
              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-purple-500 to-transparent" />
            </button>
          </Link>

          <Link href="/register">
            <button className="px-4 py-2 backdrop-blur-sm border bg-indigo-300/10 border-indigo-500/20 text-white text-center rounded-full relative">
              <span>Register Now →</span>
              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-indigo-500 to-transparent" />
            </button>
          </Link>
        </div>
      </motion.div>
    </ImagesSlider>
  );
}
