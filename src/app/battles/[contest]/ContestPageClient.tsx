import React from "react";
import { ContestDocument, ContestDesignDocument } from "@/types/types";
import { Session } from "next-auth";
import { ContestHeroSection } from "@/components/battles/ContestHero";
import { ContestEnrollmentButton } from "@/components/battles/ContestEnrollmentButton";
import { ContestDesignsGrid } from "@/components/battles/ContestDesignsGrid";
import { ContestLeaderboard } from "@/components/battles/ContestLeaderBoard";
import ContestMenu from "@/components/battles/Menu";

interface ContestPageClientProps {
  contestData: ContestDocument | null;
  designs: ContestDesignDocument[];
  isEnrolled: boolean;
  contestId: string;
  session: Session;
}

const ContestPageClient: React.FC<ContestPageClientProps> = ({
  contestData,
  designs,
  isEnrolled,
  contestId,
  session,
}) => {
  if (!contestData) return <p>Loading...</p>;
  return (
    <div className="container bg-grid-white/5 mx-auto p-6">
      <ContestHeroSection contestData={contestData} />
      <ContestMenu isEnrolled={isEnrolled} contestData={contestData} contestId={contestId} session={session} />
      <div className="flex justify-center items-center">
        <ContestEnrollmentButton
          contestData={contestData}
          isEnrolled={isEnrolled}
          contestId={contestId}
        />
      </div>
      <ContestDesignsGrid contestId={contestId} designs={designs} />
      <ContestLeaderboard designs={designs} />
    </div>
  );
};

export default ContestPageClient;
