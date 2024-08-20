// @ts-nocheck
"use server";

import {
  getContestById,
  getDesignsByContestId,
} from "@/app/battles/actions";
import ContestPageClient from "./ContestPageClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
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
    const [contestData, designs] = await Promise.all([
      getContestById(contestId),
      getDesignsByContestId(contestId),
    ]);

    const serializedContestData = JSON.parse(JSON.stringify(contestData));


    if (!contestData) {
      notFound();
      return;
    }

    return (
      <ContestPageClient
        contestData={serializedContestData}
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
