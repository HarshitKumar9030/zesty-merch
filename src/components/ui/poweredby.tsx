"use client";

import Image from "next/image";
import { useState } from "react";

const PoweredBy: React.FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className={`flex mt-8 items-center justify-center`}>
      <div
        className={`flex flex-col lg:flex-row lg:w-[50%] mt-4 items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 p-6  rounded-lg transition-transform duration-300 ease-in-out ${
          hover ? "transform scale-105" : ""
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={`flex flex-col items-center space-y-2 transition-colors duration-300 ease-in-out ${
            hover ? "text-neutral-100" : "text-neutral-700"
          }`}
        >
          <span className="font-semibold text-lg">Powered by</span>
          <div
            className={`transition-transform duration-300 ease-in-out ${
              hover ? "grayscale-0" : "grayscale"
            }`}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canva_Logo.svg/2560px-Canva_Logo.svg.png"
              alt="Canva Logo"
              width={160}
              height={60}
              className={`transition-transform duration-300 ease-in-out ${
                hover ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoweredBy;
