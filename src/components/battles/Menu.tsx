"use client";

import React, { useState, useEffect, useRef } from "react";
import { getUserEnrollmentStatus } from "@/app/battles/actions";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";

interface ContestMenuProps {
  contestId: string;
  session: Session;
}

const ContestMenu: React.FC<ContestMenuProps> = ({ contestId, session }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {/* Menu Icon */}
      <div className="fixed right-4 p-8 top-24 z-50">
        <button
          onClick={toggleMenu}
          className="p-3 bg-neutral-900 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Toggle Contest Menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Contest Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-800 p-6 fixed right-4 top-32 rounded-lg shadow-lg space-y-6 z-50 max-w-xs w-full md:w-64"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Contest Menu</h3>
            <ul className="space-y-4">
            <li>
                <Link href={`/battles`} passHref>
                  <p className="block text-lg text-purple-400 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                    Contests
                  </p>
                </Link>
              </li>
              <li>
                <Link href={`/battles/add/${contestId}`} passHref>
                  <p className="block text-lg text-purple-400 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                    Add Design
                  </p>
                </Link>
              </li>
              <li>
                <Link href={`/battles/manage/${contestId}`} passHref>
                  <p className="block text-lg text-purple-400 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                    Manage Designs
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
