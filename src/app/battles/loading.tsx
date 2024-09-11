"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex h-screen w-[100%] items-center justify-center">
      <Loader2 className="animate-spin" size={32} />
    </div>
  );
};

export default LoadingPage;
