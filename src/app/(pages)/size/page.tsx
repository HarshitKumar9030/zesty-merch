"use client";

import React from 'react';
import { motion } from 'framer-motion';


const sizeData = [
  {
    category: "Shirts",
    sizes: [
      { size: "S", chest: "34-36", waist: "28-30" },
      { size: "M", chest: "38-40", waist: "32-34" },
      { size: "L", chest: "42-44", waist: "36-38" },
      { size: "XL", chest: "46-48", waist: "40-42" },
    ],
  },
  {
    category: "Pants",
    sizes: [
      { size: "S", waist: "28-30", length: "30" },
      { size: "M", waist: "32-34", length: "32" },
      { size: "L", waist: "36-38", length: "34" },
      { size: "XL", waist: "40-42", length: "36" },
    ],
  },
  {
    category: "Shoes",
    sizes: [
      { size: "7", us: "7", uk: "6", eu: "40" },
      { size: "8", us: "8", uk: "7", eu: "41" },
      { size: "9", us: "9", uk: "8", eu: "42" },
      { size: "10", us: "10", uk: "9", eu: "43" },
    ],
  },
  {
    category: "Mugs",
    sizes: [
      { size: "250", unit: "milli litres (ml)" },
      { size: "300", unit: "milli litres (ml)" },
      { size: "350", unit: "milli litres (ml)" },
      { size: "400", unit: "milli litres (ml)" },
    ],
  },
];

const SizeGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-primary-main-bg text-neutral-100 min-h-screen p-8"
    >
      <h1 className="text-4xl font-bold mb-12 text-center">Size Guide</h1>
      <div className="space-y-12">
        {sizeData.map((category) => (
          <div key={category.category} className="bg-neutral-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-neutral-800 ">
                  {Object.keys(category.sizes[0]).map((key, index, array) => (
                      <th
                        key={key}
                        className={`px-6 py-3 text-sm font-medium text-neutral-200 ${index === 0 ? 'rounded-l-lg' : ''} ${index === array.length - 1 ? 'rounded-r-lg' : ''}`}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {category.sizes.map((size, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {Object.values(size).map((value, i) => (
                        <td key={i} className="px-6 py-4 text-sm text-neutral-300">
                          {value}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SizeGuide;
