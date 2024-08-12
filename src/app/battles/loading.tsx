"use client";

import React from "react";
import { motion } from "framer-motion";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white">
      <motion.div
        className="flex items-center justify-center w-20 h-20 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.p
        className="mt-4 text-xl font-semibold flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
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