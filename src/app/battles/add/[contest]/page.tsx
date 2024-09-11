"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  addDesignToContest,
  getUserCustomDesigns,
  getStringContestById,
  validateContestId,
} from "@/app/battles/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CheckCircle, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast"; // Importing the toast hook
import mongoose from "mongoose";
import { ContestDocument } from "@/types/types";

const AddDesignPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { contest } = params;

  const { toast } = useToast(); // Using the toast hook

  const [customDesigns, setCustomDesigns] = useState<any[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
  const [contestData, setContestData] = useState<ContestDocument | null>(null);
  const [isValidContest, setIsValidContest] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [ image, setImage ] = useState<string | undefined>();
  

  useEffect(() => {
    const fetchContestAndDesigns = async () => {
      setLoading(true);
      const isValid = await validateContestId(contest as string);

      if (!isValid) {
        setIsValidContest(false);
        setLoading(false);
        return;
      }

      if (session?.user?.email) {
        const contestString = await getStringContestById(contest as string);

        if (!contestString) {
          setIsValidContest(false);
          setLoading(false);
          return;
        }

        setIsValidContest(true);
        setContestData(JSON.parse(contestString as unknown as string)); // Parse the string back to an object

        const designString = await getUserCustomDesigns(
          session.user.email,
          contest as string
        );
        const designs = JSON.parse(designString);
        const namedDesigns = designs.filter(
          (design: any) => design.name && design.name.trim() !== ""
        );
        setCustomDesigns(namedDesigns);
        setLoading(false);
      }
    };

    fetchContestAndDesigns();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-indigo-500 w-16 h-16" />
      </div>
    );
  }

  if (isValidContest === false) {
    return (
      <div className="h-screen flex flex-col bg-neutral-900 mt-8 rounded-lg justify-center items-center text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Contest Not Found</h1>
        <p className="text-lg mb-8">The contest you are trying to access does not exist.</p>
        <Link
          href="/battles"
          className="text-indigo-500 duration-300 text-sm hover:-translate-y-2 hover:text-indigo-400"
        >
          Go Back to Contests
        </Link>
      </div>
    );
  }

  const handleDesignSelection = (designId: string) => {
    setSelectedDesignId(designId);
    const selected = customDesigns.find((design) => design._id === designId);
    let imageUrl = selected.image;
    if (imageUrl.startsWith("/")) {
      const cloudinaryString = `https://res.cloudinary.com/dz8sfaosb/image/upload/f_auto,c_limit,w_640,q_auto`;
      imageUrl = `${cloudinaryString}${imageUrl}`;
      setImage(imageUrl)
    }
    setSelectedDesign(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDesignId) {
      try {
        await addDesignToContest(contest as string, selectedDesignId, session?.user?._id!);

        toast({
          title: "Design Submitted",
          description: "Your design has been successfully added to the contest.",
        });

        router.push(`/battles/${contest}`);
      } catch (error) {
        console.error("Error adding design to contest:", error);
        toast({
          title: "Submission Failed",
          description: "There was an issue adding your design. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  

  return (
    <motion.div
      className="container mx-auto p-6 max-w-5xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {contestData && (
        <motion.div
          className="bg-gradient-to-br from-purple-800 to-purple-900 p-8 rounded-lg shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-center text-white">{contestData.name}</h1>
          <p className="text-lg text-gray-300 mb-4 text-center">{contestData.description}</p>
          <p className="text-sm text-gray-400 text-center">
            {new Date(contestData.startAt).toLocaleDateString()} <span className="text-white">to</span>{" "}
            {new Date(contestData.endAt).toLocaleDateString()}
          </p>
        </motion.div>
      )}

      <motion.div
        className="bg-gradient-to-br bg-blue-600 text-white p-6 mb-8 rounded-lg flex flex-col md:flex-row justify-center items-center shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Info className="h-12 w-12 mb-4 md:mb-0 md:mr-4 text-neutral-200" />
        <div>
          <p className="mb-1">
            To add a design, ensure it has a name and description. Set these on the{" "}
            <Link href="/designs" className="text-indigo-300 underline hover:text-indigo-400">
              Designs
            </Link>{" "}
            page.
          </p>
          <p className="mb-1">
            Manage your designs on the{" "}
            <Link href={`/battles/manage/${contest}`} className="text-indigo-300 underline hover:text-indigo-400">
              Manage Designs
            </Link>{" "}
            page.
          </p>
          <p>
            Back to{" "}
            <Link href={`/battles/${contest}`} className="text-indigo-300 underline hover:text-indigo-400">
              Contest
            </Link>.
          </p>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div>
          <label
            htmlFor="design"
            className="block text-lg font-medium mb-2 text-gray-300"
          >
            Choose a Design
          </label>
          <select
            id="design"
            value={selectedDesignId || ""}
            onChange={(e) => handleDesignSelection(e.target.value)}
            className="w-full p-4 border outline-none border-gray-700 rounded-lg bg-neutral-900 text-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-lg transition"
            required
          >
            <option value="" disabled>
              Select a design
            </option>
            {customDesigns.map((design) => (
              <option
                key={design._id}
                value={design._id}
                disabled={design.isSubmitted}
              >
                {design.name} {design.isSubmitted && "(Already Submitted)"}
              </option>
            ))}
          </select>
        </div>

        {selectedDesign && (
          <motion.div
            className="p-6 bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg shadow-lg text-white space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-between">
              {selectedDesign.name}{" "}
              {selectedDesign.isSubmitted && (
                <CheckCircle className="text-green-400 ml-2" />
              )}
            </h2>
            {selectedDesign.description && (
              <p className="text-neutral-300">{selectedDesign.description}</p>
            )}
            {selectedDesign.image && (
              <div className="mb-4">
                <Image
                  src={image as string}
                  alt={selectedDesign.name}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            )}
            <p className="text-sm text-neutral-500">Design ID: {selectedDesign.id}</p>
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:-translate-y-2 duration-300 transition transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
        >
          Submit Design
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AddDesignPage;
