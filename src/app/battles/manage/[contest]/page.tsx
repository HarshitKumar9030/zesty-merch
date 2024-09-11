"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getUserSubmittedDesignsForContest,
  deleteDesignFromContest,
} from "@/app/battles/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const ManageDesignsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { contest } = params;

  const { toast } = useToast();

  const [allDesigns, setAllDesigns] = useState<any[]>([]);
  const [displayedDesigns, setDisplayedDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const designsPerPage = 10;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    const fetchUserDesigns = async () => {
      if (session?.user?.email) {
        const designString = await getUserSubmittedDesignsForContest(
          session.user.email,
          contest as string
        );
        const userDesigns = JSON.parse(designString);
        setAllDesigns(userDesigns);
        setDisplayedDesigns(userDesigns.slice(0, designsPerPage));
        setLoading(false);
      }
    };

    fetchUserDesigns();
  }, [session?.user?.email, contest, status]);

  const handleDelete = async (designId: string) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      try {
        await deleteDesignFromContest(contest as string, designId);
        toast({
          title: "Design Deleted",
          description: "Your design has been successfully deleted.",
        });
        setAllDesigns((prevDesigns) =>
          prevDesigns.filter((design) => design._id !== designId)
        );
        setDisplayedDesigns((prevDisplayed) =>
          prevDisplayed.filter((design) => design._id !== designId)
        );
      } catch (error) {
        console.error("Error deleting design:", error);
        toast({
          title: "Delete Failed",
          description: "There was an issue deleting your design. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const loadMoreDesigns = () => {
    const nextPage = currentPage + 1;
    const nextDesigns = allDesigns.slice(
      0,
      nextPage * designsPerPage
    );
    setDisplayedDesigns(nextDesigns);
    setCurrentPage(nextPage);
  };
  
  const normalizeImage = (image: string ) => {
    if (image.startsWith("/")) {
      const cloudinaryString = `https://res.cloudinary.com/dz8sfaosb/image/upload/f_auto,c_limit,w_640,q_auto`;
      const imageUrl: string = `${cloudinaryString}${image}`;
      return imageUrl as string;
    }
    else{
      return image;
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="text-indigo-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
          <Loader2 className="animate-spin w-16 h-16" />
        </motion.div>
      </div>
    );
  }

  if (!allDesigns.length) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Manage Your Designs</h1>
        <p className="text-gray-400 mb-4">You haven&apos;t submitted any designs for this contest yet.</p>
        <Link href={`/battles/add/${contest}`}>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition transform hover:-translate-y-1">
            Submit a Design
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Manage Your Designs</h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayedDesigns.map((design) => (
          <motion.div
            key={design._id}
            className="bg-neutral-700 p-6 rounded-lg shadow-lg relative flex flex-col transition transform hover:scale-105 duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ minHeight: "350px" }} // Uniform height for all cards
          >
            <h2 className="text-2xl font-bold mb-4 text-white">{design.name}</h2>
            {design.description && (
              <p className="text-gray-300 mb-4 line-clamp-3">{design.description}</p>
            )}
            {design.image && (
              <div className="mb-4 flex-grow">
                <Image
                  src={normalizeImage(design.image)}
                  alt={design.name}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover shadow-lg w-full h-full"
                />
              </div>
            )}
            <div className="flex justify-between items-center mt-4 space-x-2">
              <Link href={design.editUrl || "/"} passHref>
                <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition transform hover:-translate-y-1">
                  <Edit className="mr-2" /> Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(design._id)}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition transform hover:-translate-y-1"
              >
                <Trash2 className="mr-2" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {displayedDesigns.length < allDesigns.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreDesigns}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition transform hover:-translate-y-1"
          >
            Load More Designs
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageDesignsPage;
