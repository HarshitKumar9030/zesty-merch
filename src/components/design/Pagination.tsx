import React from 'react';

interface PaginationProps {
  designsPerPage: number;
  totalDesigns: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ designsPerPage, totalDesigns, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalDesigns / designsPerPage);

  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-neutral-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-neutral-100">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-neutral-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
