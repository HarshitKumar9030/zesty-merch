"use client";

import { motion } from "framer-motion";

export default function ProfileSkeleton({ username }: { username: string }) {
  return (
    <div className="w-full animate-pulse">
      {/* Hero section with background */}
      <div className="relative bg-neutral-800 w-full h-64">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/80"></div>
      </div>
      
      {/* Profile info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="h-36 w-36 rounded-full bg-neutral-700 ring-4 ring-neutral-900"></div>
          
          {/* User info */}
          <div className="pt-4 md:pt-8 flex-1">
            <div className="h-8 w-64 bg-neutral-700 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-neutral-700/70 rounded-md mb-6"></div>
            
            {/* Bio */}
            <div className="space-y-2 max-w-2xl">
              <div className="h-4 w-full bg-neutral-700/60 rounded-md"></div>
              <div className="h-4 w-5/6 bg-neutral-700/60 rounded-md"></div>
              <div className="h-4 w-4/6 bg-neutral-700/60 rounded-md"></div>
            </div>
            
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <div className="w-8 h-8 rounded-full bg-neutral-700"></div>
              <div className="w-8 h-8 rounded-full bg-neutral-700"></div>
              <div className="w-8 h-8 rounded-full bg-neutral-700"></div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 md:mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center p-3 bg-neutral-800/50 rounded-lg w-24">
                <div className="h-8 w-8 rounded-full bg-neutral-700 mb-2"></div>
                <div className="h-6 w-12 bg-neutral-700 rounded-md"></div>
                <div className="h-3 w-16 bg-neutral-700/60 rounded-md mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex border-b border-neutral-800 mb-8">
          <div className="h-10 w-24 bg-neutral-700 rounded-t-md mr-4"></div>
          <div className="h-10 w-24 bg-neutral-800 rounded-t-md mr-4"></div>
          <div className="h-10 w-24 bg-neutral-800 rounded-t-md"></div>
        </div>
        
        {/* Designs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-neutral-800 rounded-lg overflow-hidden"
            >
              <div className="aspect-video w-full bg-neutral-700"></div>
              <div className="p-4">
                <div className="h-5 w-4/5 bg-neutral-700 rounded-md mb-3"></div>
                <div className="h-4 w-2/3 bg-neutral-700/60 rounded-md"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-8 w-24 bg-neutral-700/50 rounded-md"></div>
                  <div className="h-8 w-8 rounded-full bg-neutral-700/50"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}