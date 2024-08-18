// @ts-nocheck
"use server";
import {
  getContestById,
  getDesignsByContestId,
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
  const contestId = params.contest;

  if (!mongoose.Types.ObjectId.isValid(contestId)) {
    notFound();
    return;
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return;
  }

  try {
    const [contestData, designs, isEnrolled] = await Promise.all([
      getContestById(contestId),
      getDesignsByContestId(contestId),
    ]);

    if (!contestData) {
      notFound();
      return;
    }
    // console.log(contestData, designs, isEnrolled, contestId, session.user)
    return ( 
      // <div>hello</div>
      <ContestPageClient
        contestData={contestData}
        designs={designs}
        contestId={contestId}
        session={session}
      />
    );
  } catch (error) {
    console.error("Error processing contest page:", error);
    redirect("/error");
  }
}
