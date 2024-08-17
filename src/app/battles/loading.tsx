"use client";

import React from "react";
import { motion } from "framer-motion";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen w-full mt-8 rounded-lg flex flex-col items-center justify-center bg-gradient-to-br  text-white from-[#0d1b2a] via-[#1e3a8a] to-[#9333ea]">
      <motion.div
        className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r shadow-lg from-[#8338ec] to-[#3a0ca3]"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 720] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full bg-gray-800"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -360, -720] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </motion.div>
      <motion.p
        className="mt-8 text-lg font-medium tracking-wider text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        Loading
        <motion.span
          className="ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          .
        </motion.span>
        <motion.span
          className="ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.2,
          }}
        >
          .
        </motion.span>
        <motion.span
          className="ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.4,
          }}
        >
          .
        </motion.span>
      </motion.p>
    </div>
  );
};

export default LoadingPage;
