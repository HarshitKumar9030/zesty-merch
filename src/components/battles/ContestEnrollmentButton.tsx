"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ContestDocument } from "@/types/types";
import { checkEnrollment } from "@/app/battles/actions";

interface ContestEnrollmentButtonProps {
  contestId: string;
  contest: string;
}

export const ContestEnrollmentButton: React.FC<ContestEnrollmentButtonProps> = ({
  contestId,
  contest,
}) => {
  const contestData: ContestDocument = JSON.parse(contest);
  const { data: session } = useSession();
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      if (session && session.user?._id) {
        const enrollmentStatus = await checkEnrollment(contestId, session.user._id);
        setIsEnrolled(enrollmentStatus);
      }
    };

    fetchEnrollmentStatus();
  }, [session, contestId]);

  const currentDate = new Date();
  const contestStartDate = new Date(contestData.startAt);
  const contestEndDate = new Date(contestData.endAt);

  const isOngoing = currentDate >= contestStartDate && currentDate <= contestEndDate;
  const hasNotStarted = currentDate < contestStartDate;
  const hasEnded = currentDate > contestEndDate;

  if (hasNotStarted) {
    return (
      <div className="text-center py-4 px-8 bg-gradient-to-r from-yellow-200 to-yellow-100 border border-yellow-300 text-yellow-900 shadow-lg rounded-2xl">
        <p className="text-base">
          This contest hasn&apos;t started yet. It will begin on{" "}
          <span className="font-bold">{contestStartDate.toLocaleDateString()}</span>.
        </p>
      </div>
    );
  }
  
  if (hasEnded) {
    return (
      <div className="text-center py-4 px-8 bg-gradient-to-r from-red-200 to-red-100 border border-red-300 text-red-900 rounded-2xl shadow-lg">
        <p className="text-base">
          This contest has ended. It ended on{" "}
          <span className="font-bold">{contestEndDate.toLocaleDateString()}</span>.
        </p>
      </div>
    );
  }
  

  return (
    <button
      onClick={() =>
        router.push(isEnrolled ? `/battles/add/${contestId}` : `/battles/enroll/${contestId}`)
      }
      className="px-14 py-4 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white text-xl mx-auto text-center rounded-full relative mt-4"
    >
      <span>{isEnrolled ? "Add Your Design" : "Join Contest"} →</span>
      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
    </button>
  );
};
