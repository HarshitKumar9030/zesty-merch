"use client";

import React, { useState, useEffect } from "react";
import {
  IconPhone,
  IconMail,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconClock,
  IconSocial,
  IconBrandX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { email, instagram, phone, x } from "@/constants";

const messages = [
  "We're here to assist you!",
  "Customer satisfaction is our priority.",
  "Get in touch with us for any queries.",
  "Follow us on social media for updates.",
];

export const CustomerSupportInfo = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full mt-8   w-full p-8 bg-neutral-900 text-neutral-200 rounded-lg shadow-md">
      {/* Gradient Background */}
      <div className="absolute inset-0  bg-gradient-to-r z-5 from-indigo-800 to-purple-800 skew-y-6 transform scale-105 opacity-20 rounded-lg pointer-events-none" />

      {/* Dotted Layout Overlay
      <div className="absolute top-0 right-0 w-40 h-40 bg-dot-sky-400/60 font-bold rounded-full transform translate-x-12 -translate-y-12 pointer-events-none overflow-hidden"></div> */}

      <div className="relative z-20 flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-0 lg:space-x-16">
        {/* Support Hours */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold mb-4">Customer Support</h2>
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
              <IconClock className="h-8 w-8 text-gray-400" />
              Support Hours
            </h3>
            <p className="text-neutral-100 text-lg flex flex-col">Monday - Friday:
                <span className="text-base ml-4 text-neutral-400"><span className="text-blue-500">-</span> 9:00 AM - 6:00 PM</span>
            </p>
            <p className="text-neutral-100 text-lg mt-2 flex flex-col">Saturday:
                <span className="text-base ml-4 text-neutral-400"><span className="text-blue-500">-</span> 10:00 AM - 4:00 PM</span>
            </p>
            <p className="text-neutral-400 mt-2">Sunday is Closed</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="lg:w-1/2 space-y-6 lg:pl-8">
          <div className="border-b border-neutral-700 pb-6">
            <h3 className="text-xl font-medium flex items-center justify-center lg:justify-start gap-2 mb-4">
              <IconMail className="h-8 text-gray-400 w-8 " />
              Contact Us
            </h3>
            <div className="space-y-2">
            <p className="text-neutral-400 relative">
              <span className="text-xs text-white absolute hidden md:block -top-2.5">Phone:</span>
              {phone}</p>
            <p className="text-neutral-400 relative">
            <span className="text-xs text-white absolute hidden md:block -top-2.5">Email:</span>
            {email}</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
              <IconSocial className="h-8 text-gray-400 w-8" />
              Connect to Us
            </h3>
            <div className="flex justify-center lg:justify-start space-x-6">
              <a
                href={`https://x.com/${x}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neutral-400 hover:scale-105 bg-neutral-950 rounded-lg p-1 transition duration-200"
              >
                <IconBrandX className="h-8 w-8" />
              </a>
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neutral-400 hover:scale-105 bg-neutral-950 rounded-lg p-1 transition duration-200"
              >
                <IconBrandInstagram className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Text Carousel at the Bottom */}
      <div className=" my-10 flex justify-center mb-4">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl py-2 px-4 bg-neutral-800 backdrop-blur-sm text-white text-center"
          >
            {messages[currentMessageIndex]}
          </motion.div>
        </div>
      </div>
  );
};
