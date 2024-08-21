"use client";

import React, { useState, useEffect } from "react";
import { rateDesign } from "@/app/battles/actions";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";

interface RatingClientProps {
  contestId: string;
  designId: string;
  initialRating: number;
  totalRatings: number;
  userInitialRating?: number;
}

export const RatingClient: React.FC<RatingClientProps> = ({
  contestId,
  designId,
  initialRating,
  totalRatings,
  userInitialRating = 0,
}) => {
  const [currentRating, setCurrentRating] = useState(userInitialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState(initialRating);
  const [ratingsCount, setRatingsCount] = useState(totalRatings);
  const { data: session } = useSession();

  useEffect(() => {
    setCurrentRating(userInitialRating); 
  }, [userInitialRating]);

  const handleRating = async (rating: number) => {
    if (!session || !session.user) {
      console.error("User must be logged in to rate.");
      return;
    }

    try {
      await rateDesign(contestId, designId, session.user._id, rating);

      const totalRatingSum = averageRating * ratingsCount + rating;
      const newAverageRating = totalRatingSum / (ratingsCount + 1);

      setAverageRating(newAverageRating);
      setCurrentRating(rating); 
      setRatingsCount((prevCount) => prevCount + 1); 
    } catch (error) {
      console.error("Failed to rate the design:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="bg-neutral-900 p-6 rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold text-white text-center mb-4">
          Rate this Design
        </h3>
        <div className="flex justify-center items-center space-x-3 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              className={`w-14 h-14 transition-all transform ${
                (hoverRating || currentRating) >= star
                  ? "text-yellow-500"
                  : "text-neutral-500"
              } hover:scale-110 hover:duration-300 ease-out`}
            >
              <Star
                className="w-12 h-12"
                fill={
                  (hoverRating || currentRating) >= star
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          ))}
        </div>
        <p className="text-center text-neutral-400 mt-2">
          Total Ratings: <span className="text-white">{ratingsCount} </span>
        </p>
      </div>
    </div>
  );
};
