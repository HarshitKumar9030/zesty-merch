"use client";

import React from "react";
import { motion } from "framer-motion";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <motion.div
        className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
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
          className="w-10 h-10 rounded-full bg-black"
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
        className="mt-8 text-lg font-medium tracking-wider"
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
