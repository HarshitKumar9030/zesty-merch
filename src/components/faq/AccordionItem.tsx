import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}  
      className="border-b border-neutral-700 last:border-b-0 rounded-lg overflow-hidden"
    >
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center p-6 text-left bg-neutral-900 hover:bg-neutral-800 focus:outline-none rounded-t-lg transition-colors duration-300"
      >
        <span className="text-lg font-medium text-neutral-100">{question}</span>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}  
          className="w-6 h-6 text-neutral-400"
        >
          <ChevronDownIcon />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              opacity: { duration: 0.4, ease: "easeInOut" }, 
              height: { duration: 0.4, ease: [0.25, 0.7, 0.25, 1]  }, 
            }}
            className="overflow-hidden bg-neutral-800 p-6 text-neutral-300 rounded-b-lg"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccordionItem;
