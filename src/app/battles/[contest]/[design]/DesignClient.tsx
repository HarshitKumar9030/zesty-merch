"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RatingClient } from "./RatingClient";
import { User, Flag, ArrowLeft, Loader2, Star } from "lucide-react";

interface DesignClientProps {
  contest: string;
  designData: {
    design: {
      _id: string;
      name: string;
      image: string;
      description?: string;
    };
    contest: {
      name: string;
    };
    user: {
      _id: string;
      username: string;
      name?: string;
    };
    ratings: {
      user: string;
      rating: number;
    }[];
  };
}

const DesignClient: React.FC<DesignClientProps> = ({ contest, designData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-8 rounded-lg items-center h-screen bg-neutral-900">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-indigo-500 w-16 h-16 mb-4" />
          <p className="text-white text-lg">Loading the design...</p>
        </div>
      </div>
    );
  }

  let imageUrl = designData.design.image;
  if (imageUrl.startsWith("/")) {
    const cloudinaryString = `https://res.cloudinary.com/dz8sfaosb/image/upload/f_auto,c_limit,w_640,q_auto`;
    imageUrl = `${cloudinaryString}${imageUrl}`;
  }

  const initialAverageRating =
    designData.ratings.reduce((sum, { rating }) => sum + rating, 0) /
      designData.ratings.length || 0;

  const userRating =
    designData.ratings.find((rating) => rating.user === designData.user._id)
      ?.rating || 0;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg transition-transform duration-300">
        <div className="mb-6 flex justify-center">
          <Image
            src={imageUrl}
            alt={designData.design.name}
            width={800}
            height={450}
            className="rounded-lg shadow-md object-cover"
          />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          {designData.design.name}
        </h1>

        {designData.design.description && (
          <p className="text-neutral-300 text-lg mb-8 text-center">
            {designData.design.description}
          </p>
        )}

        <div className="bg-neutral-900 p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-3 text-white">
            <Flag className="w-6 h-6 text-purple-400" />
            <div>
              <p className="font-semibold text-lg">Contest</p>
              <Link
                href={`/battles/${contest}`}
                className="text-purple-400 hover:text-purple-300 duration-300 hover:translate-x-1"
              >
                {designData.contest.name}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <User className="w-6 h-6 text-purple-400" />
            <div>
              <p className="font-semibold text-lg">Made by</p>
              <Link
                href={`/profiles/${designData.user.username}`}
                className="text-purple-400 hover:text-purple-300 duration-300 hover:translate-x-1"
              >
                {designData.user.name || designData.user.username}
              </Link>
            </div>
          </div>
        </div>


          <RatingClient
            contestId={contest}
            designId={designData.design._id}
            initialRating={initialAverageRating}
            totalRatings={designData.ratings.length}
            userInitialRating={userRating}
          />

        <div className="text-center mt-8">
          <Link href={`/battles/${contest}`}>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-all duration-300 flex items-center justify-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Contest</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesignClient;
