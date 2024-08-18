// @ts-nocheck 
import React from "react";
import { ContestDesignDocument } from "@/types/types";
import Image from "next/image";

interface ContestLeaderboardProps {
  designs: ContestDesignDocument[];
}

export const ContestLeaderboard: React.FC<ContestLeaderboardProps> = ({ designs }) => {
  if (!Array.isArray(designs)) {
    console.error("Expected designs to be an array but got:", designs);
    return <p>Error: Invalid designs data.</p>;
  }

  const sortedDesigns = designs
    .filter((design) => design.rating !== undefined && design.design?.name && design.design?.image)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="mt-12 px-4">
      <h2 className="text-4xl font-extrabold text-white mb-12 text-center tracking-wide">Top Designs</h2>
      {sortedDesigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedDesigns.map((design, index) => {
            let imageUrl = design.design.image;
            if (imageUrl.startsWith('/goyhu3obmrbyrkfawa3l.png')) {
              const cloudinaryString = `https://res.cloudinary.com/dz8sfaosb/image/upload/f_auto,c_limit,w_640,q_auto`;
              imageUrl = `${cloudinaryString}${imageUrl}`;
            }

            return (
              <div
                key={design.design._id}
                className="p-6 bg-neutral-900 shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-700"
              >
                <div className="flex justify-center items-center mb-4">
                  <span className="bg-purple-600 text-white rounded-full px-3 py-1 text-lg font-semibold">
                    #{index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">{design.design.name}</h3>
                <p className="text-neutral-400 mb-6 text-sm text-center">{design.design.description}</p>
                <div className="mb-4">
                  <Image
                    src={imageUrl} 
                    alt={design.design.name}
                    width={500}
                    height={500}
                    className="rounded-lg object-cover shadow-lg"
                  />
                </div>
                <p className="text-center text-lg mt-2 font-semibold text-white">
                  Rating: <span className="text-yellow-500">{design.rating}/5</span>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-neutral-400 text-center text-lg mt-8">No designs have been rated yet.</p>
      )}
    </div>
  );
};
