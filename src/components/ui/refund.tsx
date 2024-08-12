"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const RefundComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 mt-4 flex items-center justify-center"
    >
      <div className="max-w-screen-md  mx-auto bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Returns and Refunds</h1>
        <div className="space-y-6">
          <div className="p-1 hover:scale-105 group transition-all rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-yellow-500">
            <div className="bg-neutral-800 p-4 rounded-lg">
              <h2 className="text-2xl group-hover:font-bold duration-300 group-hover:text-white font-semibold mb-4">Our Policy</h2>
              <p className="text-lg">
                At Zesty Merch, we strive to ensure that our customers are completely satisfied with their purchases. However, due to the nature of our products, we do not issue refunds unless in special cases.
              </p>
            </div>
          </div>
          <div className="p-1 rounded-lg group hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-pink-500 to-yellow-500">
            <div className="bg-neutral-800 p-4 rounded-lg">
              <h2 className="text-2xl group-hover:font-bold duration-300 group-hover:text-white font-semibold mb-4">Special Cases</h2>
              <p className="text-lg">
                If you believe your situation warrants a special consideration for a refund, please contact us through our{" "}
                <Link href="/contact">
                  <span className="text-blue-400 hover:text-blue-600">Contact Page</span>
                </Link>
                . Our customer service team will review your case and get back to you as soon as possible.
              </p>
            </div>
          </div>
          <div className="p-1 rounded-lg group hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-pink-500 to-yellow-500">
            <div className="bg-neutral-800 p-4 rounded-lg">
              <h2 className="text-2xl group-hover:font-bold duration-300 group-hover:text-white font-semibold mb-4">Contact Us</h2>
              <p className="text-lg">
                For any questions or concerns regarding our return and refund policy, please do not hesitate to reach out to us through our{" "}
                <Link href="/contact">
                  <span className="text-blue-400 hover:text-blue-600">Contact Page</span>
                </Link>
                . We are here to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RefundComponent;
