"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ContestCardProps {
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  imageUrl: string;
}

export const ContestCard: React.FC<ContestCardProps> = ({
  name,
  description,
  startAt,
  endAt,
  imageUrl,
}) => {
  const maxDescriptionLength = 200;
  const trimmedDescription =
    description.length > maxDescriptionLength
      ? `${description.substring(0, maxDescriptionLength)}...`
      : description;

  return (
    <motion.div
      className="card h-full md:h-auto rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-teal-500 p-1 overflow-hidden w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto border border-neutral-900"
      transition={{ duration: 0.3 }}
    >
      <div className="h-full w-full bg-dot-neutral-100/15 bg-neutral-950 rounded-lg p-4 relative">
        <div className="image mb-4">
          <Image
            src={imageUrl || "/contest_main.webp"}
            width={600}
            height={400}
            alt="Contest"
            className="object-cover h-48 w-full rounded-2xl"
          />
        </div>
        <div className="p-4 bg-gradient-to-br border-neutral-900 border from-black/60 via-neutral-900/40 to-neutral-900/10 backdrop-blur-sm rounded-2xl">
          <h3 className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            {name}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-neutral-300">
            {trimmedDescription}
          </p>
          <p className="mt-4 text-xs text-neutral-400">
            Starts: {new Date(startAt).toLocaleDateString()} | Ends:{" "}
            {new Date(endAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
