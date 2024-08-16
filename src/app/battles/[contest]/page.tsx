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
import { redirect, notFound } from "next/navigation";
import mongoose from "mongoose";

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

  // Validate if contestId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(contestId)) {
    console.error("Invalid contest ID format:", contestId);
    notFound();
    return;
  }

  const contestData: ContestDocument | null = await getContestById(contestId);
  if (!contestData) {
    console.error("Contest data not found for ID:", contestId);
    notFound();
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
