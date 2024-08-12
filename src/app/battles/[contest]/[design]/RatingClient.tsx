"use client";

import React, { useState, useEffect } from 'react';
import { rateDesign } from '@/app/battles/actions';
import { useSession } from 'next-auth/react';

interface RatingClientProps {
  contestId: string;
  designId: string;
  initialRating: number;
  totalRatings: number;
  userInitialRating?: number; // Optional prop for the user's initial rating
}

export const RatingClient: React.FC<RatingClientProps> = ({
  contestId,
  designId,
  initialRating,
  totalRatings,
  userInitialRating = 0, // Default to 0 if not provided
}) => {
  const [currentRating, setCurrentRating] = useState(userInitialRating);
  const [averageRating, setAverageRating] = useState(initialRating);
  const [ratingsCount, setRatingsCount] = useState(totalRatings);
  const { data: session } = useSession();

  useEffect(() => {
    setCurrentRating(userInitialRating); // Set the initial user's rating on load
  }, [userInitialRating]);

  const handleRating = async (rating: number) => {
    if (!session || !session.user) {
      console.error('User must be logged in to rate.');
      return;
    }

    try {
      await rateDesign(contestId, designId, session.user._id, rating);

      // Calculate new average rating
      const totalRatingSum = averageRating * ratingsCount + rating;
      const newAverageRating = totalRatingSum / (ratingsCount + 1);

      setAverageRating(newAverageRating);
      setCurrentRating(rating); // Update to the user's rating
      setRatingsCount((prevCount) => prevCount + 1); // Increment the count of ratings
    } catch (error) {
      console.error('Failed to rate the design:', error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          className={`w-10 h-10 ${
            star <= currentRating ? 'text-yellow-500' : 'text-neutral-500'
          } transition-transform transform hover:scale-125`}
        >
          ★
        </button>
      ))}
    </div>
  );
};
