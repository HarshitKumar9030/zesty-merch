// @ts-nocheck 

"use server";

import mongoose from "mongoose"; 
import { Contest } from "@/models/Contest";
import { CustomDesign } from "@/models/CustomDesign";
import User from "@/models/User";
import { connectDB } from "@/libs/mongodb";
import {
  ContestDesign,
  ContestDocument,
  CustomDesignDocument,
  UserDocument,
} from "@/types/types";

export const getAllContests = async (): Promise<Partial<ContestDocument>[]> => {
  await connectDB();
  const contests = await Contest.find().sort({ startAt: -1 });
  
  return contests.map(contest => ({
    _id: contest._id,
    name: contest.name,
    description: contest.description,
    startAt: contest.startAt,
    endAt: contest.endAt,
    image: contest.image,
  }));
};

export const getContestById = async (
  contestId: string
): Promise<ContestDocument | null> => {
  await connectDB();
  let a = Contest.findById(contestId)
    .populate("designs.user", "username") 
    .populate("designs.design", "name image")
    .exec();
  return a;
};

export const getStringContestById = async (
  contestId: string
): Promise<string | null> => {
  await connectDB();

  const contestData = await Contest.findById(contestId)
    .populate("designs.user", "username")
    .populate("designs.design", "name image")
    .lean()
    .exec();

  if (!contestData) {
    return null;
  }

  return JSON.stringify(contestData);
};

export const getDesignsByContestId = async (
  contestId: string,
  options: { limit?: number } = {}
): Promise<CustomDesignDocument[]> => {
  await connectDB();

  const { limit = 50 } = options;

  try {
    const contest = await Contest.findById(contestId)
      .populate({
        path: "designs.user",
        select: "username",
      })
      .populate({
        path: "designs.design",
        select: "name image",
      })
      .slice("designs", limit) 
      .exec();

    if (!contest) {
      console.error(`Contest not found for ID: ${contestId}`);
      return [];
    }

    return JSON.parse(JSON.stringify(contest.designs)) || [];
  } catch (error) {
    console.error("Error fetching designs by contest ID:", error);
    return [];
  }
};

export const checkUsername = async (username: string): Promise<boolean> => {
  await connectDB();
  const user = await User.findOne({ username }).exec();
  return !user;
};

export const createUsername = async (
  username: string,
  userId: string
): Promise<UserDocument | null> => {
  await connectDB();
  const user = await User.findById(userId).exec();
  if (user) {
    user.username = username;
    await user.save();
  }
  return user;
};

export const addDesignToContest = async (
  contestId: string,
  designId: string,
  userId: string
): Promise<ContestDocument | null> => {
  await connectDB();

  const design = await CustomDesign.findById(designId).exec();
  if (!design) {
    throw new Error("Design not found");
  }

  const contest = await Contest.findById(contestId).exec();
  if (!contest) {
    throw new Error("Contest not found");
  }

  const isSubmitted = await checkIfDesignSubmitted(contestId, designId);
  if (isSubmitted) {
    throw new Error("Design already submitted to this contest");
  }

  if (!contest.enrolledUsers.includes(userId)) {
    throw new Error("User is not enrolled in the contest");
  }

  contest.designs.push({
    design: design._id,
    user: userId,
    rating: 0,
    ratings: [],
  });

  await contest.save();

  return JSON.stringify(contest);
};

export const getUserProfile = async (
  username: string
): Promise<UserDocument | null> => {
  await connectDB();

  return User.findOne({ username }).exec();
};

export const getRandomContestId = async () => {
  await connectDB();

  const currentDate = new Date();

  const contests = await Contest.find({
    startAt: { $lte: currentDate }, 
    endAt: { $gte: currentDate },  
  }).exec();

  if (contests.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * contests.length);
  return contests[randomIndex]._id;
};



export const getUserCustomDesigns = async (
  email: string,
  contestId: string
) => {
  await connectDB();

  const designs = await CustomDesign.find({ email }).exec();
  const contest = await Contest.findById(contestId).populate("designs.design").exec();

  if (!contest) {
    throw new Error("Contest not found");
  }

  const designIdsSubmitted = contest.designs.map((design) =>
    design.design._id.toString()
  );

  let result = designs.map((design) => ({
    ...design.toObject(),
    isSubmitted: designIdsSubmitted.includes(design._id.toString()),
  }));
  return JSON.stringify(result);
};

export const checkEnrollment = async (
  contestId: string,
  userId: string
): Promise<boolean> => {
  await connectDB();
  const contest = await Contest.findById(contestId);
  if (!contest) {
    throw new Error("Contest not found");
  }

  return contest.enrolledUsers.some(
    (user: Schema.Types.ObjectId) => user.toString() === userId
  );
};

export const enrollUserInContest = async (
  contestId: string,
  userId: string
): Promise<ContestDocument | null> => {
  await connectDB();
  const contest = await Contest.findById(contestId).exec();
  const user = await User.findById(userId).exec();

  if (!contest || !user) {
    throw new Error("Contest or User not found");
  }

  const isEnrolled = contest.enrolledUsers.includes(userId);

  if (!isEnrolled) {
    contest.enrolledUsers.push(user);
    await contest.save();
  }

  return JSON.stringify(contest);
};

export const checkIfDesignSubmitted = async (
  contestId: string,
  designId: string
): Promise<boolean> => {
  await connectDB();
  const contest = await Contest.findById(contestId).exec();
  if (!contest) {
    throw new Error("Contest not found");
  }

  return contest.designs.some(
    (design) => design.design.toString() === designId
  );
};


export const getDesignById = async (contestId: string, designId: string) => {
  await connectDB();

  const contest = await Contest.findById(contestId)
    .populate('designs.design')
    .populate('designs.user', 'username name')
    .exec();

  if (!contest) return null;

  const design = contest.designs.find((d) => d.design._id.toString() === designId);
  if (!design) return null;

  return {
    design: design.design,
    user: design.user,
    contest: { name: contest.name, _id: contest._id },
    ratings: design.ratings,
  };
};

export const rateDesign = async (
  contestId: string,
  designId: string,
  userId: string,
  rating: number
) => {
  await connectDB();

  const contest = await Contest.findById(contestId).exec();
  if (!contest) throw new Error('Contest not found');

  const design = contest.designs.find(
    (d) => d.design._id.toString() === designId
  );
  
  if (!design) throw new Error('Design not found');

  const existingRating = design.ratings.find(
    (r) => r.user.toString() === userId
  );

  if (existingRating) {
    // Update the existing rating
    existingRating.rating = rating;
  } else {
    // Add new rating
    design.ratings.push({ user: userId, rating });
  }

  // Calculate the new average rating
  design.rating =
    design.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
    design.ratings.length;

  await contest.save();
};


export const getUserEnrollmentStatus = async (userId: string, contestId: string): Promise<boolean> => {
  return await checkEnrollment(contestId, userId);
};

export const deleteDesignFromContest = async (contestId: string, designId: string): Promise<boolean> => {
  await connectDB();

  const contest = await Contest.findById(contestId);
  if (!contest) {
    throw new Error("Contest not found");
  }

  const initialDesignCount = contest.designs.length;
  contest.designs = contest.designs.filter(design => design.design.toString() !== designId);

  const isDeleted = initialDesignCount !== contest.designs.length;
  if (isDeleted) {
    await contest.save();
  }

  return isDeleted;
};

export const getDesignByContestAndUserId = async (
  contestId: string,
  userId: string
): Promise<ContestDesign[]> => {
  await connectDB();

  const contest = await Contest.findById(contestId)
    .populate({
      path: 'designs.design',
      select: 'name image description', s
    })
    .populate({
      path: 'designs.user',
      select: '_id', // Only fetch the user ID
    })
    .exec();

  if (!contest) {
    throw new Error("Contest not found");
  }

  const userDesigns = contest.designs.filter(
    (design) => design.user._id.toString() === userId
  );

  return userDesigns.map((design) => ({
    _id: design.design._id,
    name: design.design.name,
    image: design.design.image,
    description: design.design.description,
    rating: design.rating,
    ratings: design.ratings,
  })) as ContestDesign[];
};


export const checkUserHasUsername = async (userId: string): Promise<boolean> => {
  await connectDB();
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }
  return !!user.username;
};


// Satyanash ho Max Call stack ka ab meine naya funciton bana liya :)

export const validateContestId = async (contestId: string): Promise<boolean> => {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(contestId)) {
    return false;
  }

  const contestExists = await Contest.exists({ _id: contestId });
  return !!contestExists;
};

export const getUserSubmittedDesignsForContest = async (
  email: string,
  contestId: string
): Promise<any> => {
  await connectDB();

  const user = await User.findOne({ email }).exec();
  if (!user) return JSON.stringify([]); // Return empty if no user is found

  const contest = await Contest.findById(contestId)
    .populate({
      path: "designs.design",
      model: "CustomDesign",
    })
    .exec();

  if (!contest) return JSON.stringify([]); 

  const userSubmittedDesigns = contest.designs.filter(
    (design) => design.user.toString() === user._id.toString()
  );

  const userDesigns = await Promise.all(
    userSubmittedDesigns.map(async (design) => {
      const designDetails = await CustomDesign.findById(design.design._id).exec();
      return {
        _id: design.design._id,
        name: designDetails.name,
        image: designDetails.image,
        description: designDetails.description,
        editUrl: designDetails.editUrl,
      };
    })
  );

  return JSON.stringify(userDesigns);
};

export const validateDesignId = async (contestId: string, designId: string): Promise<boolean> => {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(contestId) || !mongoose.Types.ObjectId.isValid(designId)) {
    return false;
  }

  const contest = await Contest.findById(contestId).populate('designs.design');
  if (!contest) {
    return false;
  }

  const designExists = contest.designs.some((design) => design.design._id.toString() === designId);
  return designExists;
};