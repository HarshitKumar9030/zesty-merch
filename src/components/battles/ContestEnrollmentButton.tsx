"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ContestDocument } from "@/types/types";

interface ContestEnrollmentButtonProps {
  contestData: ContestDocument;
  isEnrolled: boolean;
  contestId: string;
}

export const ContestEnrollmentButton: React.FC<ContestEnrollmentButtonProps> = ({
  contestData,
  isEnrolled,
  contestId,
}) => {
  const router = useRouter();

  const currentDate = new Date();
  const isOngoing =
    currentDate >= new Date(contestData.startAt) &&
    currentDate <= new Date(contestData.endAt);

  if (!isOngoing) {
    return (
      <p className="text-sm text-center mt-4 text-emerald-400">
        This contest is either upcoming or has already ended. Please check back later for more exciting contests!
      </p>
    );
  }

  return isEnrolled ? (
    <button
      onClick={() => router.push(`/battles/add/${contestId}`)}
      className="px-14 py-3 backdrop-blur-md bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-600 text-white items-center justify-center border-transparent text-center rounded-full relative mt-4 shadow-lg transform transition-transform hover:scale-105"
    >
      <span>Add Your Designs →</span>
      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-700 to-transparent" />
    </button>
  ) : (
    <button
      onClick={() => router.push(`/battles/enroll/${contestId}`)}
      className="px-6 py-3 backdrop-blur-md bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-600 text-white mx-auto text-center rounded-full relative mt-4 shadow-lg transform transition-transform hover:scale-105"
    >
      <span>Join the Contest Now →</span>
      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-700 to-transparent" />
    </button>
  );
};
