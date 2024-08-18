import React from "react";
import { redirect } from "next/navigation";
import { ContestDocument, ContestDesignDocument } from "@/types/types";
import { Session } from "next-auth";
import { ContestHeroSection } from "@/components/battles/ContestHero";
import { ContestDesignsGrid } from "@/components/battles/ContestDesignsGrid";
import { ContestLeaderboard } from "@/components/battles/ContestLeaderBoard";
import ContestMenu from "@/components/battles/Menu";
import LoadingPage from "../loading";
import { ContestEnrollmentButton } from "@/components/battles/ContestEnrollmentButton";

interface ContestPageClientProps {
  contestData: ContestDocument | null;
  designs: ContestDesignDocument[];
  contestId: string;
  session: Session | null;
}

const ContestPageClient: React.FC<ContestPageClientProps> = async ({
  contestData,
  designs,
  contestId,
  session,
}) => {
  if (!session) {
    redirect("/battles");
  }

  if (!contestData) return <LoadingPage />;

  return (
    <div className="container bg-grid-white/5 mx-auto p-6">
      <ContestHeroSection contestData={contestData} />

      <ContestMenu contest={JSON.stringify(contestData)} contestId={contestId} session={session} />
      <div className="flex justify-center items-center">
        <ContestEnrollmentButton contest={JSON.stringify(contestData)} contestId={contestId} />
      </div>

      <ContestDesignsGrid contestId={contestId} designs={designs} />
      <ContestLeaderboard designs={designs} />
    </div>
  );
};

export default ContestPageClient;
