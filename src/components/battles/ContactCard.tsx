"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Mail, Phone, MapPin } from "lucide-react";
import { address, phone } from "@/constants";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

export const ContactCard: React.FC = () => {
  return (
    <motion.div
      className={`p-8 rounded-xl bg-neutral-900 bg-dot-neutral-100/20 shadow-lg text-white ${poppins.className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ backgroundOpacity: 1 }}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6  flex space-x-2 justify-center text-center text-white">
        <div className="text-3xl md:text-4xl text-blue-500">\</div> Contact the Organizers <div className="text-blue-500 text-3xl md:text-4xl">/</div> 
      </h2>

      <div className="space-y-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-3 space-y-3 md:space-y-0">
          <Mail className="w-8 h-8 p-1 bg-black rounded-lg hover:scale-105 transition-all text-neutral-300" />
          <p className="text-lg md:text-xl text-neutral-300">zestymerchapp@gmail.com</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/contact">
          <motion.button
            className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-black/80 to-neutral-950/90 bg-clip-border rounded-xl text-neutral-100 text-base md:text-lg hover:bg-gradient-to-r transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </Link>
      </div>

      <div className="mt-8 text-center text-neutral-200 text-sm md:text-base">
        <p>
          We would love to hear from you! Whether you have questions, suggestions, or need assistance,
          we&apos;re here to help.
        </p>
      </div>
    </motion.div>
  );
};
