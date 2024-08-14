"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserDocument, CustomDesignDocument } from '../../../types/types';
import { getCustomDesignsByEmail, deleteDesign } from '../../../app/actions'; 
import DesignCard from '../../../components/design/DesignCard';
import Pagination from '../../../components/design/Pagination';
import { motion } from 'framer-motion';
import Link from "next/link";
import { Button } from '@/components/ui/moving-border';

const UserDesigns = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserDocument>({} as UserDocument);
  const [designs, setDesigns] = useState<CustomDesignDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const designsPerPage = 10;

  useEffect(() => {
    if (status === 'loading') return; 

    if (!session) {
      router.push('/'); 
    } else {
      setUser(session.user as UserDocument);
    }
  }, [session, status, router]);

  useEffect(() => {
    if (user.email) {
      fetchDesigns(user.email);
    }
  }, [user.email]);

  const fetchDesigns = async (email: string) => {
    try {
      setLoading(true);
      const fetchedDesigns = await getCustomDesignsByEmail(email);
      setDesigns(fetchedDesigns);
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteDesign = async (designId: string) => {
    try {
      await deleteDesign(designId); 
      setDesigns((prevDesigns) =>
        prevDesigns.filter((design) => design._id !== designId)
      );
    } catch (error) {
      console.error("Error deleting design:", error);
    }
  };

  const filteredDesigns = designs.filter((design) => {
    const idString = design._id ? design._id.toString() : '';
    const nameMatch = design.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = idString.includes(searchTerm);
    const designIdMatch = design.id.includes(searchTerm);
    
    return nameMatch || idMatch || designIdMatch;
  });

  const indexOfLastDesign = currentPage * designsPerPage;
  const indexOfFirstDesign = indexOfLastDesign - designsPerPage;
  const currentDesigns = filteredDesigns.slice(indexOfFirstDesign, indexOfLastDesign);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-primary-main-bg text-neutral-100 min-h-screen p-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Your Designs</h1>
        <div className="mt-4 md:mt-0 gap-6 flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Name, CanvaId or DesignId from orders"
            className="px-4 py-2 rounded-lg border border-neutral-900 bg-neutral-800 text-neutral-100 placeholder-neutral-400"
          />
          <Link href="/products">
            <Button borderRadius="1.75rem" className="bg-slate-900 text-white border-slate-900">Create Design</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: designsPerPage }).map((_, index) => (
              <DesignCard key={index} design={{} as CustomDesignDocument} isLoading={true} onDelete={function (designId: string): void {
              throw new Error('Function not implemented.');
            } } />
            ))
          : currentDesigns.map((design) => (
              <DesignCard
                key={design._id}
                design={design}
                onDelete={handleDeleteDesign} 
              />
            ))}
      </div>
      <Pagination
        designsPerPage={designsPerPage}
        totalDesigns={filteredDesigns.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </motion.div>
  );
};

export default UserDesigns;
