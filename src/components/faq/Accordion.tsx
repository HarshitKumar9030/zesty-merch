import React from "react";
import AccordionItem from "./AccordionItem";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default Accordion;
