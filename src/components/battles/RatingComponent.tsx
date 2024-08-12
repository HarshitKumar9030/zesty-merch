import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  averageRating: number;
}

export const Rating: React.FC<RatingProps> = ({ averageRating }) => {
  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <Star key={index} className="w-5 h-5 text-yellow-500" fill="currentColor" />
        ))}
      {halfStar && (
        <Star
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star key={index} className="w-5 h-5 text-neutral-600" />
        ))}
      <span className="ml-2 text-neutral-400 text-sm">{averageRating.toFixed(1)} / 5</span>
    </div>
  );
};
