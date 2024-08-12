"use client";

import React from "react";
import Accordion from "@/components/faq/Accordion";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "What is your return policy?",
    answer:
      "We do not issue refunds unless in special cases. If you believe your situation warrants a refund, please contact us.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Tracking is currently not available. We will notify you once this feature is available.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards for now.",
  },
  {
    question: "Can I change my shipping address?",
    answer:
      "No, you can not once you've placed the order, please be mindful while placing an order.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we deliver to over 100 countries worldwide. Delivery times and customs fees may vary.",
  },
];

const FAQPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-primary-main-bg text-neutral-100 min-h-screen p-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>
        <Accordion items={faqItems} />
      </div>
    </motion.div>
  );
};

export default FAQPage;
