"use client";

import React from "react";
import { UserDocument } from "@/types/types";
import Image from "next/image";
import { IconBrandGithub, IconBrandInstagram, IconBrandX, IconShare } from "@tabler/icons-react";

interface UserProfilePageProps {
  user: UserDocument;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user }) => {
  const shareProfile = () => {
    const url = window.location.href;
    const title = `${user.name}'s Profile on Zesty Merch`;

    if (navigator.share) {
      navigator
        .share({
          title,
          url,
        })
        .then(() => console.log("Profile shared successfully"))
        .catch((error) => console.log("Error sharing profile:", error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Profile link copied to clipboard!");
      });
    }
  };

  return (
    <div
      className="flex items-center mt-4 justify-center min-h-screen"
      style={{
        backgroundImage: `url(${user.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-neutral-900 rounded-lg p-8 max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <Image
            src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user.username}`}
            alt={`user avatar`}
            width={120}
            height={120}
            className="rounded-full border-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-border border-neutral-100 p-0 duration-300 hover:scale-105"
          />
        </div>
        <h1 className="text-4xl font-bold text-neutral-100 mb-2">{user.name}</h1>
        <p className="text-neutral-400 text-lg mb-4">{user.description}</p>
        <div className="flex justify-center space-x-6 mt-6">
          {user.instagram && (
            <a
              href={`https://instagram.com/${user.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-white bg-black rounded-lg hover:scale-105 "
            >
              <IconBrandInstagram className="w-8 h-8" />
            </a>
          )}
          {user.x && (
            <a
              href={`https://x.com/${user.x}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-white bg-black rounded-lg hover:scale-105 "
            >
              <IconBrandX className="w-8 h-8" />
            </a>
          )}
          {user.github && (
            <a
              href={`https://github.com/${user.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-white bg-black rounded-lg hover:scale-105 "
            >
              <IconBrandGithub className="w-8 h-8" />
            </a>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={shareProfile}
            className="flex items-center justify-center space-x-2 bg-black text-white py-2 px-4 rounded-lg hover:scale-105 transition"
          >
            <IconShare className="w-6 h-6" />
            <span>Share Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
