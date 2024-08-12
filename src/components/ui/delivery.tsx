"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../libs/utils";

const deliveryData = [
  {
    id: 1,
    title: "Standard Delivery",
    description:
      "Our standard delivery takes 5-7 business days. We strive to ensure that your order reaches you in perfect condition.",
    details: ["Available for all orders", "No additional fees", "Tracking not available"],
    icon: "📦",
    borderClassName: "bg-gradient-to-r from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "Express Delivery",
    description:
      "Express delivery is currently unavailable. We are working on providing faster delivery options in the future.",
    details: ["Not available", "Check back soon", "Tracking not available"],
    icon: "⚡",
    borderClassName: "bg-gradient-to-r from-green-500 to-yellow-600",
  },
  {
    id: 3,
    title: "International Delivery",
    description: "We deliver to over 100 countries worldwide. Delivery times may vary.",
    details: ["Available for international orders", "Customs fees may apply", "Tracking available"],
    icon: "🌍",
    borderClassName: "bg-gradient-to-r from-pink-500 to-red-600",
  },
  {
    id: 4,
    title: "Order Processing",
    description:
      "Orders are processed within 1-2 business days. You will receive an email confirmation once your order is processed.",
    details: ["Processing time: 1-2 business days", "Email confirmation", "Tracking number provided"],
    icon: "🛠️",
    borderClassName: "bg-gradient-to-r from-indigo-500 to-teal-600",
  },
];

const DeliveryComponent = () => {
  return (
    <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {deliveryData.map((item) => (
        <div
          key={item.id}
          className={cn(
            "rounded-lg overflow-hidden h-full shadow-lg",
            item.borderClassName,
            "p-1.5 hover:scale-105 duration-300"
          )}
        >
          <div className="bg-neutral-900 p-4 rounded-lg h-full">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-3xl">{item.icon}</div>
              <h2 className="text-xl font-bold text-neutral-100">
                {item.title}
              </h2>
            </div>
            <p className="text-neutral-300 mb-4">
              {item.description}
            </p>
            <ul className="space-y-2 pl-0 text-neutral-400">
              {item.details.map((detail, index) => (
                <li key={index} className="before:content-['-'] before:mr-2 before:text-blue-500">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryComponent;
