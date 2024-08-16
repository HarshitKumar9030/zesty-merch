"use client";

import React, { useState, useEffect, useRef } from "react";
import { getUserEnrollmentStatus } from "@/app/battles/actions";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";
import { ContestDocument } from "@/types/types";

interface ContestMenuProps {
  contestData: ContestDocument;
  contestId: string;
  session: Session;
}

const ContestMenu: React.FC<ContestMenuProps> = ({ contestId, session, contestData }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date();
  const isOngoing =
    currentDate >= new Date(contestData.startAt) &&
    currentDate <= new Date(contestData.endAt);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (!isOngoing) {
    return null;
  }

  return (
    <>
      <div className="fixed right-4 p-8 top-24 z-50">
        <button
          onClick={toggleMenu}
          className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
          aria-label="Toggle Contest Menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-neutral-800 to-neutral-700 p-6 fixed right-4 top-32 rounded-lg shadow-lg space-y-6 z-50 max-w-xs w-full md:w-64 border border-neutral-600"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Contest Menu</h3>
            <ul className="space-y-4">
              <li>
                <Link href={`/battles`} passHref>
                  <p className="block text-lg text-purple-400 hover:text-purple-300 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                    View All Contests
                  </p>
                </Link>
              </li>
              <li>
                <Link href={`/battles/add/${contestId}`} passHref>
                  <p className="block text-lg text-purple-400 hover:text-purple-300 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                    Add Your Design
                  </p>
                </Link>
              </li>
              <li>
                <Link href={`/battles/manage/${contestId}`} passHref>
                  <p className="block text-lg text-purple-400 hover:text-purple-300 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                    Manage Your Designs
                  </p>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContestMenu;
