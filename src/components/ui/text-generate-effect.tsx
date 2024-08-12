"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/libs/utils";

const Shapes = () => {
  return (
    <div className="shapes-container">
      <div className="shape shape-circle"></div>
      <div className="shape shape-square"></div>
    </div>
  );
};

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
              margin: "0 4px",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-semibold lg:font-bold relative", className)}>
      <Shapes />
      <div className="lg:mx-8 my-4 text-center p-8 text-ellipsis relative z-10">
        <div className="text-lg lg:text-2xl leading-snug tracking-normal">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
