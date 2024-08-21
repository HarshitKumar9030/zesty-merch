import React from "react";
import { ContestDesignDocument } from "@/types/types";
import Image from "next/image";
import { Rating } from "./RatingComponent";
import Link from "next/link";

interface ContestDesignsGridProps {
  designs: any[];
  contestId: string; 
}

export const ContestDesignsGrid: React.FC<ContestDesignsGridProps> = ({
  designs,
  contestId,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {designs.map((design) => {
        const averageRating =
          design.ratings.reduce((sum: any, { rating }: any) => sum + rating, 0) /
            design.ratings.length || 0;

        let imageUrl = design.design.image;
        if (imageUrl.startsWith('/')) {
          const cloudinaryString = `https://res.cloudinary.com/dz8sfaosb/image/upload/f_auto,c_limit,w_640,q_auto`;
          imageUrl = `${cloudinaryString}${imageUrl}`;
        }

        return (
          <Link
            key={design.design._id}
            href={`/battles/${contestId}/${design.design._id}`}
            className="block p-4 bg-neutral-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <h3 className="text-lg font-bold text-white mb-2">
              {design.design.name}
            </h3>
            <p className="text-neutral-400 mb-2 text-sm">
              {design.design.description}
            </p>
            <div className="mb-3">
              <Image
                src={imageUrl} 
                alt={design.design.name}
                width={300}
                height={300}
                className="rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="flex justify-between items-center mb-3">
              <Rating averageRating={averageRating} />
              <p className="text-xs text-neutral-500">
                {design.ratings.length} reviews
              </p>
            </div>
            <div className="text-xs text-neutral-400">
              <span>Made by </span>
              <span className="text-purple-400 hover:underline">
                {design.user.name || design.user.username}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
