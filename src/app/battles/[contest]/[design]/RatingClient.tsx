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
  const [isUserRatingNew, setIsUserRatingNew] = useState(userInitialRating === 0);
  const { data: session } = useSession();

  useEffect(() => {
    setCurrentRating(userInitialRating);
    setIsUserRatingNew(userInitialRating === 0);
  }, [userInitialRating]);

  const handleRating = async (rating: number) => {
    if (!session || !session.user) {
      console.error("User must be logged in to rate.");
      return;
    }

    try {
      await rateDesign(contestId, designId, session.user._id, rating);

      const totalRatingSum = isUserRatingNew
        ? averageRating * ratingsCount + rating
        : averageRating * ratingsCount - currentRating + rating;

      const newAverageRating = totalRatingSum / (isUserRatingNew ? ratingsCount + 1 : ratingsCount);

      setAverageRating(newAverageRating);
      setCurrentRating(rating);

      if (isUserRatingNew) {
        setRatingsCount((prevCount) => prevCount + 1);
        setIsUserRatingNew(false);
      }
    } catch (error) {
      console.error("Failed to rate the design:", error);
    }
  };

  return (
    <div className="text-neutral-400 bg-neutral-900 bg-dot-neutral-300/10 rounded-xl text-center py-6 mb-6">
      <p
        id="averageRating"
        className="text-2xl font-semibold mb-3 flex flex-col items-center"
      >
        Average Rating
        <span className="flex items-center text-yellow-500 overflow-hidden space-x-1">
          <span>{averageRating.toFixed(1)}</span>
          <Star className="w-6 h-6 text-yellow-500" />
          <span className="text-neutral-100 flex items-center overflow-hidden space-x-1">
            <span>/ 5</span>
            <Star className="w-6 h-6 text-neutral-100" />
          </span>
        </span>
      </p>
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
  );
};
