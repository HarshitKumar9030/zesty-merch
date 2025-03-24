"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { updateUserProfile } from "@/app/profiles/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Instagram, Twitter, Link, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define UserDocument type to avoid ts-nocheck
interface UserDocument {
  name?: string;
  email?: string;
  phone?: string;
  username?: string;
  github?: string;
  instagram?: string;
  x?: string;
  backgroundUrl?: string;
  description?: string;
  image?: string;
}

interface SocialInputProps {
  icon: React.ReactNode;
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialInput = ({ icon, label, id, value, onChange }: SocialInputProps) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={id} className="text-sm text-neutral-300">
      {label}
    </Label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
        {icon}
      </div>
      <Input
        id={id}
        value={value || ''}
        onChange={onChange}
        className="pl-10 py-3 rounded-md bg-neutral-800/50 text-neutral-100 border border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  </div>
);

export default function EditProfile() {
  const [user, setUser] = useState<UserDocument>({});
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user as UserDocument);
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUser(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!user.email) {
        throw new Error("Email is required");
      }
      
      const updatedUser = await updateUserProfile(user.email, {
        // Passing only the properties accepted by the updateUserProfile function
        username: user.username,
        github: user.github,
        instagram: user.instagram,
        x: user.x,
        backgroundUrl: user.backgroundUrl,
        description: user.description,
      });
      
      await update({ ...session, user: updatedUser.user });
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="bg-neutral-900 text-neutral-100 p-0 rounded-lg shadow-lg max-w-lg mx-auto border border-neutral-800">
      <div className="max-h-[85vh] overflow-y-auto" data-lenis-prevent>
        <DialogHeader className="p-6 sticky top-0 z-10 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback className="bg-neutral-800">
                {user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl font-bold">{user.name || "Your Profile"}</DialogTitle>
              <DialogDescription className="text-sm text-neutral-400">
                Customize how others see you on the platform
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full bg-neutral-800">
              <TabsTrigger value="basic" className="flex-1">Basic Info</TabsTrigger>
              <TabsTrigger value="social" className="flex-1">Social Profiles</TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="pt-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-sm text-neutral-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={user.name || ''}
                    onChange={handleChange}
                    className="py-3 rounded-md bg-neutral-800/50 text-neutral-100 border border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username" className="text-sm text-neutral-300">
                    Username
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                      <User size={16} />
                    </div>
                    <Input
                      id="username"
                      value={user.username || ''}
                      onChange={handleChange}
                      className="pl-10 py-3 rounded-md bg-neutral-800/50 text-neutral-100 border border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      placeholder="username"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-sm text-neutral-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user.email || ''}
                    disabled={Boolean(session?.user.image)}
                    onChange={handleChange}
                    className="py-3 rounded-md bg-neutral-800/50 text-neutral-100 border border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:opacity-60"
                  />
                  {session?.user.image && (
                    <p className="text-xs text-neutral-500">Email can&apos;t be changed for social logins</p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone" className="text-sm text-neutral-300">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={user.phone || ''}
                    onChange={handleChange}
                    className="py-3 rounded-md bg-neutral-800/50 text-neutral-100 border border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description" className="text-sm text-neutral-300">
                    Bio
                  </Label>
                  <Textarea
                    id="description"
                    value={user.description || ''}
                    onChange={handleChange}
                    className="py-3 rounded-md bg-neutral-800/50 text-neutral-100 border border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="social" className="pt-4">
              <div className="space-y-4">
                <SocialInput 
                  icon={<Github size={16} />} 
                  label="GitHub" 
                  id="github" 
                  value={user.github || ''} 
                  onChange={handleChange} 
                />
                
                <SocialInput 
                  icon={<Instagram size={16} />} 
                  label="Instagram" 
                  id="instagram" 
                  value={user.instagram || ''} 
                  onChange={handleChange} 
                />
                
                <SocialInput 
                  icon={<Twitter size={16} />} 
                  label="X (Twitter)" 
                  id="x" 
                  value={user.x || ''} 
                  onChange={handleChange} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="pt-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="backgroundUrl" className="text-sm text-neutral-300">
                    Background Image URL
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                      <Link size={16} />
                    </div>
                    <Input
                      id="backgroundUrl"
                      value={user.backgroundUrl || ''}
                      onChange={handleChange}
                      className="pl-10 py-3 rounded-md bg-neutral-800/50 text-neutral-100 border border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      placeholder="https://example.com/background.jpg"
                    />
                  </div>
                </div>
                
                {user.backgroundUrl && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-neutral-700">
                    <div className="aspect-video w-full relative bg-neutral-800">
                      <img 
                        src={user.backgroundUrl} 
                        alt="Background preview" 
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x400?text=Invalid+Image";
                        }}
                      />
                    </div>
                    <p className="text-xs text-neutral-500 p-2 bg-neutral-800/50">Preview (aspect ratio may differ on profile)</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="p-6 border-t border-neutral-800">
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm w-full mb-4"
            >
              {error}
            </motion.p>
          )}
          
          <button
            onClick={handleSaveChanges}
            className={`w-full py-3 flex items-center justify-center gap-2 font-medium text-neutral-100 bg-neutral-700 rounded-lg transition-all hover:bg-neutral-800 ${loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}