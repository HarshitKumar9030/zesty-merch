"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface ContestEnrollmentButtonProps {
  isEnrolled: boolean;
  contestId: string;
}

export const ContestEnrollmentButton: React.FC<ContestEnrollmentButtonProps> = ({
  isEnrolled,
  contestId,
}) => {
  const router = useRouter();

  return isEnrolled ? (
    <button
      onClick={() => router.push(`/battles/add/${contestId}`)}
      className="px-14 py-3 backdrop-blur-sm border bg-emerald-300/10  items-center justify-center  border-emerald-500/20 text-white  text-center rounded-full relative mt-4"
    >
      <span>Add Your Designs →</span>
      <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
    </button>
  ) : (
    <button
      onClick={() => router.push(`/battles/enroll/${contestId}`)}
      className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
    >
      <span>Join now →</span>
      <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
    </button>
  );
};
