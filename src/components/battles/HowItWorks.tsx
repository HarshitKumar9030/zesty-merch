"use client";

import { useRouter } from "next/navigation";
import { getRandomContestId } from "@/app/battles/actions";
import { useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "600", "300"],
  subsets: ["latin"],
});
export const HowItWorks = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleJoinRandomContest = async () => {
    setLoading(true);
    const rawContestId = await getRandomContestId();
    const randomContestId = JSON.parse(rawContestId as string);
    if (randomContestId) {
      router.push(`/battles/${randomContestId}`);
    } else {
      alert("No contests available.");
    }
    setLoading(false);
  };

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <button
            onClick={handleJoinRandomContest}
            className={`px-4 py-2 hover:scale-105 transition-all loading ? "opacity-50 cursor-not-allowed" : "" backdrop-blur-sm border bg-pink-300/10 border-pink-500/20 text-white mx-auto text-center rounded-full relative`}
          >
            <span>{loading ? "Joining..." : "Join a Random Contest →"}</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-purple-500 to-transparent" />
          </button>
        </div>

        <h2 className={`text-3xl lg:text-5xl mt-4 font-extrabold text-center mb-10 text-neutral-100 ${poppins.className}`}>
          How It Works
        </h2>
        <div className="grid grid-cols-1 duration-300 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-700 rounded-xl hover:shadow-[8px_8px_0px_0px_rgba(109,40,217)] transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <h3 className="md:text-2xl text-xl flex flex-col font-bold text-white mb-4">
              📝 Step 1
              <span className={`${poppins.className} text-neutral-200`}>Enroll in a Contest</span>
            </h3>
            <p className="text-neutral-200 text-lg">
              Browse through our exciting design contests and pick the one that
              interests you the most.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-r from-green-500  to-teal-700 rounded-xl hover:shadow-[8px_8px_0px_0px_rgba(16,185,129)] transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <h3 className="md:text-2xl text-xl flex flex-col font-bold text-white mb-4">
              🎨 Step 2
              <span className={`${poppins.className} text-neutral-200`}>Submit Your Design</span>
            </h3>
            <p className="text-neutral-200 text-lg">
              Create and submit your unique design. Show off your creativity and
              compete with others.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-r from-red-500  to-pink-700 rounded-xl hover:shadow-[8px_8px_0px_0px_rgba(244,114,182)] transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <h3 className="md:text-2xl text-xl flex flex-col font-bold text-white mb-4">
              🏆 Step 3<span className={`${poppins.className} text-neutral-200`}>Vote & Win</span>
            </h3>
            <p className="text-neutral-200 text-lg">
              Vote on your favorite designs and stand a chance to win amazing
              prizes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
