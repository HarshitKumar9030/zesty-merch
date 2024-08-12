"use client";

import React from 'react';

interface LogButtonProps {
  data: any;  
}

const LogButton: React.FC<LogButtonProps> = ({ data }) => {
  return (
    <button
      onClick={() => console.log(data)}
      className="px-4 py-4 rounded-lg bg-neutral-700 text-neutral-100 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50"
      aria-label="Log filtered cart"
    >
      Log filtered cart
    </button>
  );
};

export default LogButton;
