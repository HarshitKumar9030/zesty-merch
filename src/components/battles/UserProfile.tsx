"use client";

import React, { useState } from "react";
import { UserDocument } from "@/types/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Github as IconBrandGithub, 
  Instagram as IconBrandInstagram, 
  Twitter as IconBrandX, 
  Share as IconShare,
  Trophy, 
  PaintBucket, 
  Calendar, 
  Activity,
  ExternalLink,
  Heart
} from "lucide-react";
import Link from "next/link";

interface UserMetrics {
  totalDesigns: number;
  contestWins: number;
  memberSince?: string;
  engagement: number;
  designsPerCategory?: Record<string, number>;
}

interface UserProfilePageProps {
  user: UserDocument;
  designs: any[];
  contestWins: any[];
  metrics: UserMetrics;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ 
  user, 
  designs = [], 
  contestWins = [], 
  metrics 
}) => {
  const [activeTab, setActiveTab] = useState("designs");
  const displayName = user.name || user.username || "User";
  
  const shareProfile = () => {
    const url = window.location.href;
    const title = `${displayName}'s Profile on Zesty Merch`;
    if (navigator.share) {
      navigator.share({
        title,
        url,
      }).catch((error) => console.log("Error sharing profile:", error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Profile link copied to clipboard!");
      });
    }
  };
  
  const backgroundUrl = user.backgroundUrl || "/images/default-profile-bg.jpg";
  const avatarUrl = user.image || `https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`;
  
  const tabContents = {
    designs: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {designs.length > 0 ? designs.map((design, index) => (
          <motion.div 
            key={design._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-neutral-700/30 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image 
                src={design.image || "/images/placeholder-design.jpg"}
                alt={design.name || "Design"}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-white truncate">{design.name || "Untitled Design"}</h3>
              <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{design.description || "No description provided."}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">{new Date(design.createdAt).toLocaleDateString()}</span>
                <Link href={`/designs/${design._id}`} className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  <span className="text-sm">View</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-neutral-400 text-lg">No designs created yet.</p>
          </div>
        )}
      </div>
    ),
    
    wins: (
      <div className="mt-8">
        {contestWins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contestWins.map((win, index) => (
              <motion.div 
                key={win._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex bg-gradient-to-r from-amber-900/20 to-yellow-800/20 rounded-xl overflow-hidden border border-yellow-600/30 p-4"
              >
                <div className="mr-4 p-2 bg-yellow-600/20 rounded-lg self-start">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">{win.contestName || "Design Contest"}</h3>
                  <p className="text-yellow-300/80 text-sm mb-2">Winner</p>
                  <p className="text-sm text-neutral-400 mb-3">{win.design?.description || "No description provided."}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">{new Date(win.winDate).toLocaleDateString()}</span>
                    <Link href={`/battles/${win.contestId}`} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      <span className="text-sm">View Contest</span>
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-neutral-400 text-lg">No contest wins yet.</p>
          </div>
        )}
      </div>
    ),
    
    about: (
      <div className="mt-8 bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">About</h3>
            <p className="text-neutral-300 leading-relaxed">
              {user.description || "This user hasn't added a description yet."}
            </p>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3 text-white">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {metrics.designsPerCategory && Object.entries(metrics.designsPerCategory).length > 0 ? (
                  Object.entries(metrics.designsPerCategory).map(([category, count]) => (
                    <span key={category} className="px-3 py-1 bg-neutral-700/50 rounded-full text-sm text-neutral-300">
                      {category} <span className="text-purple-400">({count})</span>
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-500 text-sm">No categories yet</span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Stats</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <PaintBucket size={16} className="text-purple-400" />
                  <span className="text-sm text-neutral-300">Total Designs</span>
                </div>
                <p className="text-2xl font-bold text-white">{metrics.totalDesigns}</p>
              </div>
              
              <div className="bg-neutral-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy size={16} className="text-yellow-400" />
                  <span className="text-sm text-neutral-300">Contest Wins</span>
                </div>
                <p className="text-2xl font-bold text-white">{metrics.contestWins}</p>
              </div>
              
              <div className="bg-neutral-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={16} className="text-blue-400" />
                  <span className="text-sm text-neutral-300">Member Since</span>
                </div>
                <p className="text-base font-medium text-white">{metrics.memberSince || "N/A"}</p>
              </div>
              
              <div className="bg-neutral-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={16} className="text-green-400" />
                  <span className="text-sm text-neutral-300">Engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-white">{metrics.engagement}</p>
                  <div className="w-full bg-neutral-600/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                      style={{ width: `${metrics.engagement}%` }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };
  
  return (
    <div className="min-h-screen pb-16">
      {/* Hero banner with background */}
      <div 
        className="h-64 w-full bg-neutral-900 relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900"></div>
        
        {/* Share button */}
        <button 
          onClick={shareProfile}
          className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm hover:bg-black/50 p-2 rounded-full text-white transition-colors"
        >
          <IconShare size={20} />
        </button>
      </div>
      
      {/* Profile content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-neutral-900 shadow-xl">
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* User info */}
          <div className="flex-1 pt-4 md:pt-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">{displayName}</h1>
            <p className="text-neutral-400 mb-6">@{user.username}</p>
            
            {user.description && (
              <p className="text-neutral-300 max-w-3xl mb-6">
                {user.description}
              </p>
            )}
            
            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {user.github && (
                <a
                  href={`https://github.com/${user.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-800/40 backdrop-blur-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <IconBrandGithub size={20} />
                </a>
              )}
              {user.instagram && (
                <a
                  href={`https://instagram.com/${user.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-800/40 backdrop-blur-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <IconBrandInstagram size={20} />
                </a>
              )}
              {user.x && (
                <a
                  href={`https://x.com/${user.x}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-800/40 backdrop-blur-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <IconBrandX size={20} />
                </a>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-6 md:mt-8 md:self-center flex flex-wrap gap-4 w-full md:w-auto">
            <div className="flex flex-col items-center p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 w-24">
              <PaintBucket size={20} className="text-purple-400 mb-1" />
              <span className="text-xl font-bold text-white">{metrics.totalDesigns}</span>
              <span className="text-xs text-neutral-400">Designs</span>
            </div>
            
            <div className="flex flex-col items-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 w-24">
              <Trophy size={20} className="text-yellow-400 mb-1" />
              <span className="text-xl font-bold text-white">{metrics.contestWins}</span>
              <span className="text-xs text-neutral-400">Wins</span>
            </div>
            
            <div className="flex flex-col items-center p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 w-24">
              <Heart size={20} className="text-pink-400 mb-1" />
              <span className="text-xl font-bold text-white">69</span>
              <span className="text-xs text-neutral-400">Likes</span>
            </div>
          </div>
        </div>
        
        {/* Content tabs */}
        <div className="mt-12">
          <div className="flex border-b border-neutral-800">
            <button
              onClick={() => setActiveTab("designs")}
              className={`pb-2 px-4 font-medium transition-colors ${
                activeTab === "designs"
                  ? "text-white border-b-2 border-purple-500"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Designs
            </button>
            <button
              onClick={() => setActiveTab("wins")}
              className={`pb-2 px-4 font-medium transition-colors ${
                activeTab === "wins"
                  ? "text-white border-b-2 border-yellow-500"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Contest Wins
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-2 px-4 font-medium transition-colors ${
                activeTab === "about"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              About
            </button>
          </div>
          
          {tabContents[activeTab as keyof typeof tabContents]}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;