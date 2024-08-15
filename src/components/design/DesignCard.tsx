"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CustomDesignDocument } from "../../types/types";
import EditModal from "./EditModal";
import { MenuIcon } from "lucide-react";

interface DesignCardProps {
  design: CustomDesignDocument;
  isLoading?: boolean;
  onDelete: (designId: string) => void; 
}

const DesignCard: React.FC<DesignCardProps> = ({ design, isLoading, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    "editName" | "editDescription" | null
  >(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleEditName = () => {
    setModalContent("editName");
    closeMenu();
  };

  const handleEditDescription = () => {
    setModalContent("editDescription");
    closeMenu();
  };

  const handleDeleteDesign = () => {
    if (design._id) {
      onDelete(design._id.toString());
    }
    closeMenu();
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 p-4 rounded shadow-lg">
        <div className="animate-pulse">
          <div className="h-40 bg-neutral-700 rounded mb-2"></div>
          <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const cloudinaryString = `https://res.cloudinary.com/dz8sfaosb/image/upload/f_auto,c_limit,w_640,q_auto`;
  const imageUrl = design.image.startsWith("/")
    ? `${cloudinaryString}${design.image}`
    : design.image;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-pink-600 to-purple-600 p-1 rounded-lg shadow-lg relative"
    >
      <div className="bg-neutral-800 h-full p-4 rounded-lg">
        <Image
          src={imageUrl}
          alt={`Design ${design.id}`}
          width={400}
          height={300}
          className="rounded mb-2"
        />
        <div>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-sm font-semibold py-1 px-2 text-neutral-50 rounded-lg bg-neutral-700 mb-2">
              {design.name || `Design Id: ${design.id}`}
            </h2>
            <button
              onClick={toggleMenu}
              className="text-sm text-neutral-300 bg-neutral-700 rounded-lg px-2 py-2"
            >
              <MenuIcon />
            </button>
          </div>
          <div className="text-13 text-neutral-400">
            {design.description ||
              "This is a default description. Add your own by pressing the button above."}
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-neutral-800 ring-1 ring-black ring-opacity-5 z-50"
              >
                <button
                  onClick={handleEditName}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700 rounded-t-md"
                >
                  Edit Name
                </button>
                <button
                  onClick={handleEditDescription}
                  className="block w-full text-left px-4 py-2 rounded-b-md text-sm text-white hover:bg-neutral-700"
                >
                  Edit Description
                </button>
                <button
                  onClick={handleDeleteDesign}
                  className="block w-full text-left px-4 py-2 text-sm hover:rounded-b-lg text-red-500 hover:bg-neutral-700"
                >
                  Delete Design
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {modalContent && (
              <EditModal
                design={design}
                modalContent={modalContent}
                closeModal={() => setModalContent(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default DesignCard;
