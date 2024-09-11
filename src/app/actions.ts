"use server";

import { connectDB } from "@/libs/mongodb";
import { Product } from "@/models/Products";
import { CustomDesign } from "@/models/CustomDesign";
import { EnrichedProducts, CustomDesignDocument, NewsletterDocument, ContestDocument } from "@/types/types";
import User  from "@/models/User"
import { Contact } from "@/models/Contact";
import { ContactDocument } from "@/types/types"; 
import { Newsletter } from "@/models/Newsletter";
import { Schema } from "mongoose";
import Contest from "@/models/Contest";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllProducts = async () => {
  try {
    await connectDB();

    const products: EnrichedProducts[] = await Product.find();
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw new Error("Failed to fetch category products");
  }
};

export const getCategoryProducts = async (category: string) => {
  try {
    await connectDB();

    const products: EnrichedProducts[] = await Product.find({ category });
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw new Error("Failed to fetch category products");
  }
};

export const getRandomProducts = async (productId: string) => {
  const shuffleArray = (array: EnrichedProducts[]) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  try {
    await connectDB();

    const allProducts: EnrichedProducts[] = await Product.find();
    const shuffledProducts = shuffleArray(allProducts);
    const randomProducts = shuffledProducts
      .filter((product) => product._id.toString() !== productId)
      .slice(0, 6);
    return randomProducts;
  } catch (error) {
    console.error("Error getting products:", error);
    throw new Error("Failed to fetch random products");
  }
};

export const getProduct = async (_id: string) => {
  try {
    await connectDB();

    const product = await Product.findOne({ _id });
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
  }
};

export const getCustomDesign = async (userId: string) => {
  try {
    await connectDB();

    const customDesign = await CustomDesign.find({ userId });
    return customDesign;
  } catch (error) {
    console.error("Error getting Custom Designs", error);
  }
};


export async function addDesign(customDesign: Partial<CustomDesignDocument>) {
  try {
    await connectDB();
    const newCustomDesign = new CustomDesign({
      ...customDesign,
      id: customDesign.id,
    });
    await newCustomDesign.save();

    await User.updateOne(
      { email: customDesign.email },
      { $push: { customDesigns: newCustomDesign._id } }
    );

    return newCustomDesign;
  } catch (error) {
    console.error("Error saving custom design:", error);
    throw error;
  }
}

export async function getCustomDesigns(userEmail: string, productId: string): Promise<CustomDesignDocument[]> {
  try {
    await connectDB();
    const customDesigns = await CustomDesign.find({ email: userEmail, productId: productId });
    return customDesigns;
  } catch (error) {
    console.error("Error fetching custom designs:", error);
    throw error;
  }
}

export async function getMostRecentCustomDesign(userEmail: string, productId: string): Promise<CustomDesignDocument | null> {
  try {
    await connectDB();
    const customDesign = await CustomDesign.findOne({ email: userEmail, productId: productId }).sort({ createdAt: -1 });
    return customDesign;
  } catch (error) {
    console.error("Error fetching custom designs:", error);
    throw error;
  }
}

export async function getCustomDesignById(designId: string): Promise<CustomDesignDocument | null> {
  try {
    await connectDB();
    const customDesign = await CustomDesign.findOne({ id: designId });
    return customDesign;
  } catch (error) {
    console.error("Error fetching custom design by ID:", error);
    throw error;
  }
}

export async function getCustomDesignsByEmail(userEmail: string): Promise<CustomDesignDocument[]> {
  try {
    await connectDB();
    const customDesigns = await CustomDesign.find({ email: userEmail });
    return JSON.stringify(customDesigns) as any;
  } catch (error) {
    console.error("Error fetching custom designs:", error);
    throw error;
  }
}

export async function addOrEditDescription(designId: string, description: string): Promise<CustomDesignDocument> {
  try {
    await connectDB();
    const design = await CustomDesign.findById(designId);
    if (!design) {
      throw new Error('Design not found');
    }

    design.description = description;
    await design.save();
    revalidatePath('/designs')
    return JSON.stringify(design) as any;
  } catch (error) {
    console.error('Error adding or editing description:', error);
    throw error;
  }
}

export async function addOrEditName(designId: string, name: string): Promise<CustomDesignDocument> {
  try {
    await connectDB();
    const design = await CustomDesign.findById(designId);
    if (!design) {
      throw new Error('Design not found');
    }

    design.name = name;
    await design.save();
    revalidatePath('/designs')
    return JSON.stringify(design) as any;
  } catch (error) {
    console.error('Error adding or editing name:', error);
    throw error;
  }
}

export async function deleteDesign(designId: string): Promise<void> {
  try {
    await connectDB();
    const design = await CustomDesign.findByIdAndDelete(designId);
    if (!design) {
      throw new Error('Design not found');
    }
  } catch (error) {
    console.error('Error deleting design:', error);
    throw error;
  }
}

export async function handleContactForm(formData: Partial<ContactDocument>) {
  try {
    await connectDB();

    const newContactForm = new Contact({
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(), 
    });

    await newContactForm.save();
    return { success: true, message: "Form submitted successfully!" };
  } catch (error) {
    console.error("Error saving contact form:", error);
    throw new Error("Failed to submit form");
  }
}


export async function subscribeToNewsletter(email: string) {
  try {
    await connectDB();

    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return { success: true, message: "Email already subscribed!" };
    }

    const newSubscription = new Newsletter({
      email,
      subscribedAt: new Date(),
    } as Partial<NewsletterDocument>);

    await newSubscription.save();
    return { success: true, message: "Subscription Successful!" };
  } catch (error) {
    console.error("Error subscribing to the newsletter:", error);
    throw new Error("Failed to subscribe to the newsletter");
  }
}

export async function getOngoingContests(): Promise<ContestDocument[]> {
  await connectDB();
  const currentDate = new Date();
  const contests = await Contest.find({ startAt: { $lte: currentDate }, endAt: { $gte: currentDate } });
  return contests;
}

export async function getUpcomingContests(): Promise<ContestDocument[]> {
  await connectDB();
  const currentDate = new Date();
  const contests = await Contest.find({ startAt: { $gt: currentDate } });
  return contests;
}

export async function getContestById(contestId: string): Promise<ContestDocument | null> {
  await connectDB();
  const contest = await Contest.findById(contestId).populate('designs.design').populate('enrolledUsers');
  return contest;
}

export async function getUserEnrollmentStatus(userEmail: string, contestId: string): Promise<boolean> {
  await connectDB();
  const contest = await Contest.findOne({ _id: contestId, enrolledUsers: { $in: [await getUserIdByEmail(userEmail)] } });
  return !!contest;
}

export async function enrollUserInContest(userEmail: string, contestId: string): Promise<void> {
  await connectDB();
  const userId = await getUserIdByEmail(userEmail);
  await Contest.findByIdAndUpdate(contestId, { $addToSet: { enrolledUsers: userId } });
}

export async function getDesignsForContest(contestId: string) {
  await connectDB();
  const contest = await Contest.findById(contestId).populate('designs.design');
  return contest ? contest.designs : [];
}

export async function addDesignToContest(userEmail: string, contestId: string, designId: string): Promise<void> {
  await connectDB();
  const userId = await getUserIdByEmail(userEmail);
  const design = await CustomDesign.findById(designId);
  if (design) {
    await Contest.findByIdAndUpdate(contestId, {
      $push: {
        designs: { design: design._id, user: userId, rating: 0, ratings: [] },
      },
    });
  }
}

export async function rateDesign(userEmail: string, contestId: string, designId: string, rating: number): Promise<void> {
  await connectDB();
  const userId = await getUserIdByEmail(userEmail);
  const contest = await Contest.findById(contestId);
  if (!contest) throw new Error("Contest not found");

  const design = contest.designs.find((d) => d.design.toString() === designId);
  if (!design) throw new Error("Design not found in this contest");

  const existingRating = design.ratings.find((r) => r.user.toString() === userId.toString());
  if (existingRating) {
    existingRating.rating = rating;
  } else {
    design.ratings.push({ user: userId, rating });
  }

  design.rating = design.ratings.reduce((sum, r) => sum + r.rating, 0) / design.ratings.length;

  await contest.save();
}

async function getUserIdByEmail(email: string): Promise<Schema.Types.ObjectId> {
  const user: any = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  return user._id;
}