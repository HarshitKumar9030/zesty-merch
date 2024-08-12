// @ts-nocheck 
"use client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserDocument } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { updateUserProfile } from "@/app/profiles/actions";

export default function EditProfile() {
  const [user, setUser] = useState<UserDocument>({} as UserDocument);
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user as UserDocument);
    }
  }, [session]);



  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await updateUserProfile(user.email, {
        username: user.username,
        github: user.github,
        instagram: user.instagram,
        x: user.x,
        backgroundUrl: user.backgroundUrl,
        description: user.description,
      });
      
      update({ ...session, user: updatedUser.user }); 
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="bg-neutral-900  text-neutral-100 p-8 rounded-lg shadow-lg overflow-y-auto max-w-lg mx-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold mb-2">Edit Profile</DialogTitle>
        <DialogDescription className="text-sm text-neutral-400">
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid w-full gap-6 py-4">
        <div className="flex flex-col">
          <Label htmlFor="name" className="text-sm text-neutral-400">
            Name
          </Label>
          <Input
            id="name"
            value={user.name || ''}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email" className="text-sm text-neutral-400">
            Email
          </Label>
          <Input
            id="email"
            value={user.email || ''}
            disabled={session?.user.image ? true : false}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="phone" className="text-sm text-neutral-400">
            Phone
          </Label>
          <Input
            id="phone"
            value={user.phone || ''}
            disabled={session?.user.image ? true : false}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="username" className="text-sm text-neutral-400">
            Username
          </Label>
          <Input
            id="username"
            value={user.username || ''}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="github" className="text-sm text-neutral-400">
            GitHub
          </Label>
          <Input
            id="github"
            value={user.github || ''}
            onChange={(e) => setUser({ ...user, github: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="instagram" className="text-sm text-neutral-400">
            Instagram
          </Label>
          <Input
            id="instagram"
            value={user.instagram || ''}
            onChange={(e) => setUser({ ...user, instagram: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="x" className="text-sm text-neutral-400">
            X (Twitter)
          </Label>
          <Input
            id="x"
            value={user.x || ''}
            onChange={(e) => setUser({ ...user, x: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="backgroundUrl" className="text-sm text-neutral-400">
            Background URL
          </Label>
          <Input
            id="backgroundUrl"
            value={user.backgroundUrl || ''}
            onChange={(e) => setUser({ ...user, backgroundUrl: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="description" className="text-sm text-neutral-400">
            Description
          </Label>
          <Input
            id="description"
            value={user.description || ''}
            onChange={(e) => setUser({ ...user, description: e.target.value })}
            className="mt-2 p-3 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <DialogFooter>
        <button
          onClick={handleSaveChanges}
          className={`w-full py-3 px-3 mt-2 border-neutral-800  text-neutral-100 duration-300 bg-neutral-700 rounded-lg transition-all hover:bg-neutral-800 ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </DialogFooter>
      {error && <p className="text-neutral-200 mt-4 text-center">{error}</p>}
    </DialogContent>
  );
}
