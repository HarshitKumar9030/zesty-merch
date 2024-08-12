"use server";

import { UserDocument } from "@/types/types";
import User from "@/models/User";
import { connectDB } from "@/libs/mongodb";


export const updateUserProfile = async (
  email: string,
  data: Partial<Pick<UserDocument, "username" | "github" | "instagram" | "x" | "backgroundUrl" | "description">>
) => {
  try {
    await connectDB();

    if (!email) {
      throw new Error("Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (data.username) user.username = data.username;
    if (data.github) user.github = data.github;
    if (data.instagram) user.instagram = data.instagram;
    if (data.x) user.x = data.x;
    if (data.backgroundUrl) user.backgroundUrl = data.backgroundUrl;
    if (data.description) user.description = data.description;

    // Save the updated user
    await user.save();

    return { message: "User profile updated successfully", user };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
};
