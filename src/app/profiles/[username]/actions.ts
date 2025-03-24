"use server";

import { UserDocument, CustomDesignDocument } from "@/types/types"; 

interface UserMetrics {
  totalDesigns: number;
  contestWins: number;
  memberSince?: string;
  engagement: number;
  designsPerCategory?: Record<string, number>;
}

export async function getUserDesignsAndWins(username: string) {
  try {
    // Import functions dynamically to prevent circular dependencies
    const { getUserDesigns, getUserContestWins } = await import("@/app/battles/actions");
    
    // Fetch user designs and contest wins in parallel
    const [designsData, winsData] = await Promise.all([
      getUserDesigns(username).catch(() => []),
      getUserContestWins(username).catch(() => []),
    ]);
    
    // Process data (handle string JSON if needed)
    const designs = Array.isArray(designsData) ? designsData : [];
    const contestWins = Array.isArray(winsData) ? winsData : [];
    
    // Calculate design categories
    const designsPerCategory: Record<string, number> = designs.reduce((acc: Record<string, number>, design: any) => {
      const category = design.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    
    // Calculate member since date from first design or default
    let memberSince = "N/A";
    if (designs.length > 0 && designs[0].createdAt) {
      const date = new Date(designs[0].createdAt);
      memberSince = date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Create metrics
    const metrics: UserMetrics = {
      totalDesigns: designs.length,
      contestWins: contestWins.length,
      memberSince,
      engagement: calculateEngagement(designs.length, contestWins.length),
      designsPerCategory,
    };
    
    return {
      designs,
      contestWins,
      metrics,
    };
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    return {
      designs: [],
      contestWins: [],
      metrics: {
        totalDesigns: 0,
        contestWins: 0,
        engagement: 0,
      }
    };
  }
}

// Calculate engagement score based on activity
function calculateEngagement(designCount: number, winsCount: number): number {
  // Calculate engagement score (0-100)
  const baseScore = Math.min(designCount * 5, 60); // Up to 60 points for designs
  const winScore = Math.min(winsCount * 10, 40);   // Up to 40 points for wins
  
  return Math.min(baseScore + winScore, 100);
}