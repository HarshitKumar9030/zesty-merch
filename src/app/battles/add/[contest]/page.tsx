"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addDesignToContest, getUserCustomDesigns } from "@/app/battles/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CheckCircle, Info } from "lucide-react";
import Link from "next/link";

const AddDesignPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { contest } = params;

  const [customDesigns, setCustomDesigns] = useState<any[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);

  useEffect(() => {
    const fetchCustomDesigns = async () => {
      if (session?.user?.email) {
        const designs = await getUserCustomDesigns(session.user.email, contest as string);
        const namedDesigns = designs.filter(
          (design: any) => design.name && design.name.trim() !== ""
        );
        setCustomDesigns(namedDesigns);
      }
    };

    fetchCustomDesigns();
  }, [session?.user?.email]);

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
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center text-white">
        Submit Your Design
      </h1>
      
      {/* Info Component */}
      <div className="bg-blue-800 text-blue-200 p-4 mb-8 rounded-lg flex flex-col md:flex-row justify-center items-center">
        <Info className="h-6 w-6 mb-4 md:mb-0 md:mr-2" />
        <div>
          <p>
            To add a design, please ensure it has a name and description. You
            can set these by visiting the{" "}
            <Link href="/designs" className="text-blue-300 underline">
              Designs
            </Link>{" "}
            page.
          </p>
          <p>
            You can also manage your designs at{" "}
            <Link href={`/battles/manage/${contest}`} className="text-blue-300 underline">
              Manage Designs
            </Link>.
          </p>
          <p>
            Back to {" "}
            <Link href={`/battles/${contest}`} className="text-blue-300 underline">
              Contest
            </Link>.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="design" className="block text-lg font-medium mb-2 text-gray-300">
            Choose a Design
          </label>
          <select
            id="design"
            value={selectedDesignId || ""}
            onChange={(e) => handleDesignSelection(e.target.value)}
            className="w-full p-4 border outline-none border-gray-700 rounded-lg bg-neutral-900 text-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
          <div className="p-6 bg-gradient-to-br from-purple-800 to-neutral-900 rounded-lg shadow-lg text-white space-y-4">
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
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Submit Design
        </button>
      </form>
    </div>
  );
};

export default AddDesignPage;
