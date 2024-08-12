import React, { useEffect, useState } from "react";
import { ContestDocument } from "@/types/types";
import { ContestCard } from "./ContestCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Poppins } from "next/font/google";

interface ContestCarouselProps {
  contests: ContestDocument[];
  title: string; 
}

const poppins = Poppins({ weight: ["400", "600", "300"], subsets: ["latin"]});

export const ContestCarousel: React.FC<ContestCarouselProps> = ({ contests, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === contests.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? contests.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [contests.length]);

  return (
    <div id={title.toLowerCase().replace(" ", "-")} className="relative flex-col w-full flex items-center justify-center mt-8">
      <div className={`md:text-5xl text-3xl text-right my-8 ${poppins.className} font-bold`}>
        {title}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/50 transition"
      >
        ←
      </button>
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full flex items-center justify-center"
          >
            <Link href={`/battles/${contests[currentIndex]._id}`} key={contests[currentIndex]._id}>
              <ContestCard
                name={contests[currentIndex].name}
                description={contests[currentIndex].description}
                startAt={contests[currentIndex].startAt as unknown as string}
                endAt={contests[currentIndex].endAt as unknown as string}
                imageUrl={contests[currentIndex].image}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/50 transition"
      >
        →
      </button>
    </div>
  );
};
