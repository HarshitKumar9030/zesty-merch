// @ts-nocheck
"use server";
import {
  getContestById,
  getDesignsByContestId,
  checkEnrollment,
} from "@/app/battles/actions";
import ContestPageClient from "./ContestPageClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { ContestDocument, ContestDesignDocument } from "@/types/types";
import { redirect } from "next/navigation";

export default async function ContestPage({
  params,
}: {
  params: { contest: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
    return;
  }

  const contestId = params.contest;

  const contestData: ContestDocument | null = await getContestById(contestId);
  if (!contestData) {
    console.error("Contest data not found for ID:", contestId);
    redirect("/error");
    return;
  }

  const designs: ContestDesignDocument[] = await getDesignsByContestId(contestId);

  let isEnrolled = false;
  try {
    isEnrolled = await checkEnrollment(contestId, session.user._id);
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    redirect("/error"); 
    return;
  }

  return (
    <ContestPageClient
      contestData={contestData}
      designs={designs}
      isEnrolled={isEnrolled}
      contestId={contestId}
      session={session}
    />
  );
}
