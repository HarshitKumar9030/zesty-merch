"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addDesignToContest, getUserCustomDesigns, getContestById } from "@/app/battles/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CheckCircle, Info } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import mongoose from "mongoose";

const AddDesignPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { contest } = params;

  const [customDesigns, setCustomDesigns] = useState<any[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
  const [isValidContest, setIsValidContest] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchContestAndDesigns = async () => {
      if (!mongoose.Types.ObjectId.isValid(contest as string)) {
        setIsValidContest(false);
        return;
      }

      if (session?.user?.email) {
        const contestExists = await getContestById(contest as string);

        if (!contestExists) {
          setIsValidContest(false);
          return;
        }

        setIsValidContest(true);

        const designs = await getUserCustomDesigns(session.user.email, contest as string);
        const namedDesigns = designs.filter(
          (design: any) => design.name && design.name.trim() !== ""
        );
        setCustomDesigns(namedDesigns);
      }
    };

    fetchContestAndDesigns();
  }, [session?.user?.email]);

  if (isValidContest === false) {
    return (
      <div className="h-screen flex flex-col bg-neutral-900 mt-8 rounded-lg justify-center items-center text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Contest Not Found</h1>
        <p className="text-lg mb-8">The contest you are trying to access does not exist.</p>
        <Link href="/battles" className="text-blue-500 duration-300 text-sm hover:-translate-y-2 hover:text-blue-400">
          Go Back to Contests
        </Link>
      </div>
    );
  }

  const handleDesignSelection = (designId: string) => {
    setSelectedDesignId(designId);
    const selected = customDesigns.find((design) => design._id === designId);
    setSelectedDesign(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDesignId) {
      await addDesignToContest(contest as string, selectedDesignId, session?.user?._id!)
        .then(() => {
          router.push(`/battles/${contest}`);
        })
        .catch((error) => {
          console.error("Error adding design to contest:", error);
        });
    }
  };

  return (
    <motion.div
      className="container mx-auto p-6 max-w-3xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-10 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Submit Your Design
      </motion.h1>

      <motion.div
        className="bg-gradient-to-br from-blue-900 to-blue-800 text-blue-200 p-6 mb-8 rounded-lg flex flex-col md:flex-row justify-center items-center shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Info className="h-6 w-6 mb-4 md:mb-0 md:mr-2" />
        <div>
          <p className="mb-2">
            To add a design, ensure it has a name and description. Set these on the{" "}
            <Link href="/designs" className="text-blue-300 underline hover:text-blue-400">
              Designs
            </Link>{" "}
            page.
          </p>
          <p className="mb-2">
            Manage your designs on the{" "}
            <Link href={`/battles/manage/${contest}`} className="text-blue-300 underline hover:text-blue-400">
              Manage Designs
            </Link>{" "}
            page.
          </p>
          <p>
            Back to{" "}
            <Link href={`/battles/${contest}`} className="text-blue-300 underline hover:text-blue-400">
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
            className="w-full p-4 border outline-none border-gray-700 rounded-lg bg-neutral-900 text-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-lg transition"
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
            className="p-6 bg-gradient-to-br from-purple-800 to-neutral-900 rounded-lg shadow-lg text-white space-y-4"
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
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            )}
            <p className="text-sm text-neutral-500">Design ID: {selectedDesign._id}</p>
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
