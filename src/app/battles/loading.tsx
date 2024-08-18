"use client";

import React from "react";
import { motion } from "framer-motion";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center mt-8 text-white">
      <motion.div
        className="relative flex items-center justify-center w-20 h-20 rounded-full shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 animate-ping"
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        ></motion.div>

        <motion.div
          className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700 shadow-inner"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-gray-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.p
        className="mt-10 text-lg font-semibold tracking-wider text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        Loading
        <motion.span
          className="ml-1 text-purple-400"
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
          className="ml-1 text-blue-400"
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
          className="ml-1 text-teal-400"
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
