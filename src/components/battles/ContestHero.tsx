import React from 'react';
import { ContestDocument } from "@/types/types";
import Image from 'next/image';
import parse from 'html-react-parser';


interface ContestHeroSectionProps {
  contestData: ContestDocument;
}

export const ContestHeroSection: React.FC<ContestHeroSectionProps> = ({ contestData }) => {
  return (
    <div className="mb-8">
      <div className="relative w-full h-96">
        <Image
          src={contestData.image}
          alt={contestData.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="mt-4 p-6 bg-gradient-to-t from-neutral-700  to-neutral-800 rounded-lg">
        <h1 className="text-4xl font-extrabold text-white mb-2">{contestData.name}</h1>
        <div className="text-lg text-neutral-300 mb-4">{parse(contestData.description)}</div>
        <p className="text-sm text-neutral-400">
          Starts: {new Date(contestData.startAt).toLocaleDateString()} | Ends: {new Date(contestData.endAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
