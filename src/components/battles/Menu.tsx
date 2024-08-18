"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";
import { ContestDocument } from "@/types/types";
import { checkEnrollment } from "@/app/battles/actions"; 

interface ContestMenuProps {
  contest: string;
  contestId: string;
  session: Session;
}

const ContestMenu: React.FC<ContestMenuProps> = ({
  contest,
  contestId,
  session,
}) => {
  const contestData: ContestDocument = JSON.parse(contest);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      if (session && session.user?._id) {
        const enrollmentStatus = await checkEnrollment(contestId, session.user._id);
        setIsEnrolled(enrollmentStatus);
      }
    };

    fetchEnrollmentStatus();
  }, [session, contestId]);

  if (isEnrolled === null) return null; 

  const currentDate = new Date();
  const isOngoing =
    currentDate >= new Date(contestData.startAt) &&
    currentDate <= new Date(contestData.endAt);

  if (!isOngoing || !isEnrolled) return null;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div className="fixed right-6 top-28 z-50">
        <button
          onClick={toggleMenu}
          className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
          aria-label="Toggle Contest Menu"
        >
          {menuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-neutral-800 to-neutral-700 p-6 fixed right-4 top-24 rounded-lg shadow-lg space-y-6 z-40 max-w-xs w-full md:w-64 border border-neutral-600"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">Contest Menu</h3>
              
            </div>
            <ul className="space-y-4">
              <li>
                <Link href={`/battles`}>
                  <p className="block text-lg text-purple-400 hover:text-purple-300 hover:underline transition-all">
                    View All Contests
                  </p>
                </Link>
              </li>
              <li>
                <Link href={`/battles/add/${contestId}`}>
                  <p className="block text-lg text-purple-400 hover:text-purple-300 hover:underline transition-all">
                    Add Your Design
                  </p>
                </Link>
              </li>
              <li>
                <Link href={`/battles/manage/${contestId}`}>
                  <p className="block text-lg text-purple-400 hover:text-purple-300 hover:underline transition-all">
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
