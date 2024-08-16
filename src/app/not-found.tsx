"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Ghost } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen w-full mt-8 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-purple-600/20 to-transparent"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-700/10"
        animate={{ x: [0, 50, -50, 0], y: [0, 50, -50, 0], rotate: 360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-t from-indigo-600/30 to-purple-900/20"
        animate={{ x: [-50, 50, -50], y: [-50, 50, -50], rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <Ghost className="w-32 h-32 text-purple-300 animate-pulse" />
      </motion.div>

      <motion.h1
        className="text-7xl font-extrabold mt-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1.2,
          ease: "easeInOut",
        }}
      >
        Oops! Page Not Found
      </motion.h1>

      <motion.p
        className="text-xl mt-4 text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        Looks like you&apos;ve ventured into the void. But don&apos;t worry, we&apos;ll guide you back to the fun stuff!
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        className="mt-10 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <Link href="/">
          <p className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:bg-gradient-to-l hover:from-indigo-600 hover:to-purple-600 transition-all focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-lg">
            <Sparkles className="mr-3 h-6 w-6" />
            Back to Home
          </p>
        </Link>
      </motion.div>

      {/* Floating Sparkles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          y: [0, -20, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="absolute left-1/4 top-1/4 text-pink-300 w-8 h-8 animate-float" />
        <Sparkles className="absolute right-1/4 bottom-1/4 text-blue-300 w-6 h-6 animate-float" />
        <Sparkles className="absolute left-1/3 bottom-1/3 text-yellow-300 w-10 h-10 animate-float" />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
