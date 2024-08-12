
// @ts-nocheck 
import React from 'react';
import { getDesignById } from '@/app/battles/actions';
import Image from 'next/image';
import Link from 'next/link';
import { RatingClient } from './RatingClient';
import { notFound } from 'next/navigation';

interface DesignPageProps {
  params: {
    contest: string;
    design: string;
  };
}

const DesignPage = async ({ params }: DesignPageProps) => {
  const { contest, design } = params;

  const designData = await getDesignById(contest, design);
  if (!designData) {
    return notFound();
  }

  const initialAverageRating =
    designData.ratings.reduce((sum, { rating }) => sum + rating, 0) /
    designData.ratings.length || 0;

  const userRating = designData.ratings.find(
    (rating) => rating.user.toString() === designData.user._id.toString()
  )?.rating || 0; // Default to 0 if no rating by the user

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="bg-neutral-800 bg-dot-white/10  p-8 rounded-lg shadow-xl">
        <div className="mb-8">
          <Image
            src={designData.design.image}
            alt={designData.design.name}
            width={1000}
            height={600}
            className="rounded-lg object-cover shadow-lg mx-auto"
          />
        </div>
        <h1 className="text-5xl font-extrabold text-white mt-6 mb-4 text-center">
          {designData.design.name}
        </h1>
        {designData.design.description && (
          <p className="text-neutral-300 text-xl mb-8 text-center leading-relaxed">
            {designData.design.description}
          </p>
        )}
        <div className="text-neutral-400 text-lg mb-8">
          <p className="text-center mb-4">
            <span className="font-semibold">Contest: </span>
            <Link href={`/battles/${contest}`}>
              <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300 ease-in-out">
                {designData.contest.name}
              </span>
            </Link>
          </p>
          <p className="text-center">
            <span className="font-semibold">Made by: </span>
            <Link href={`/profiles/${designData.user.username}`}>
              <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300 ease-in-out">
                {designData.user.name || designData.user.username}
              </span>
            </Link>
          </p>
        </div>
        <div className="text-neutral-400 text-lg mb-8 text-center">
          <p id="averageRating" className="font-semibold text-2xl mb-4">
            Average Rating: {initialAverageRating.toFixed(1)} / 5
          </p>
          <RatingClient
            contestId={contest}
            designId={design}
            initialRating={initialAverageRating}
            totalRatings={designData.ratings.length}
            userInitialRating={userRating}
          />
        </div>
        <div className="text-center mt-8">
          <Link
            href={`/battles/${contest}`}
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 ease-in-out underline text-lg"
          >
            Back to Contest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;