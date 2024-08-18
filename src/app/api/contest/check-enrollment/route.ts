// @ts-nocheck
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { Contest } from "@/models/Contest";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await connectDB();

  const { contestId, userId } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(contestId)) {
    return NextResponse.json({ error: "Invalid contest ID" }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }

    const isEnrolled = contest.enrolledUsers.some(
      (user: mongoose.Types.ObjectId) => user.toString() === userId
    );

    return NextResponse.json({ isEnrolled });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
