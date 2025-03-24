"use client";

import { useRouter } from "next/navigation";
import { getRandomContestId } from "@/app/battles/actions";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, Palette, Trophy } from "lucide-react";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

interface StepCardProps {
  gradient: string;
  shadowColor: string;
  step: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  delay: number;
}

const StepCard = ({ 
  gradient, 
  shadowColor, 
  step, 
  title, 
  icon, 
  description, 
  delay 
}: StepCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`p-6 md:p-8 ${gradient} rounded-xl hover:shadow-[8px_8px_0px_0px_${shadowColor}] transition-all duration-300 ease-in-out transform hover:scale-105 border border-white/10 backdrop-blur-sm`}
  >
    <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-white/10 rounded-full">
      {icon}
    </div>
    <h3 className="md:text-2xl text-xl flex flex-col gap-1 font-bold text-white mb-4">
      Step {step}
      <span className={`${poppins.className} text-neutral-100 font-semibold`}>{title}</span>
    </h3>
    <p className="text-neutral-200 text-lg">
      {description}
    </p>
    <div className="h-1 w-16 bg-white/20 rounded-full mt-6 mx-auto"></div>
  </motion.div>
);

export const HowItWorks = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoinRandomContest = async () => {
    try {
      setLoading(true);
      setError("");
      const rawContestId = await getRandomContestId();
      const randomContestId = JSON.parse(rawContestId as string);
      
      if (randomContestId) {
        router.push(`/battles/${randomContestId}`);
      } else {
        setError("No active contests available. Check back soon!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      step: 1,
      title: "Enroll in a Contest",
      description: "Browse through our exciting design contests and pick one that matches your style and interests.",
      icon: <Sparkles size={28} className="text-white" />,
      gradient: "bg-gradient-to-r from-purple-600 to-indigo-700",
      shadowColor: "rgba(109,40,217,0.5)"
    },
    {
      step: 2,
      title: "Submit Your Design",
      description: "Use our tools to create your unique design that showcases your creativity and artistic vision.",
      icon: <Palette size={28} className="text-white" />,
      gradient: "bg-gradient-to-r from-emerald-600 to-teal-700",
      shadowColor: "rgba(16,185,129,0.5)"
    },
    {
      step: 3,
      title: "Vote & Win",
      description: "Get community votes on your design and win amazing prizes including cash rewards and merchandise.",
      icon: <Trophy size={28} className="text-white" />,
      gradient: "bg-gradient-to-r from-rose-600 to-pink-700",
      shadowColor: "rgba(244,114,182,0.5)"
    }
  ];

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl lg:text-5xl font-extrabold text-center mb-6 text-white ${poppins.className} bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400`}>
            How Design Battles Work
          </h2>
          
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-10">
            Join our creative community and showcase your design skills in fun, competitive challenges
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleJoinRandomContest}
            disabled={loading}
            className={`px-6 py-3 backdrop-blur-sm border bg-pink-500/20 border-pink-500/30 text-white mx-auto text-center rounded-full relative ${loading ? "opacity-80 cursor-not-allowed" : ""} group`}
          >
            <span className="flex items-center gap-2">
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} className="group-hover:animate-pulse" />
              )}
              {loading ? "Finding Contest..." : "Join a Random Contest"}
              {!loading && (
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              )}
            </span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-pink-500 to-transparent" />
          </motion.button>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-rose-400 mt-4"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              step={step.step}
              title={step.title}
              description={step.description}
              icon={step.icon}
              gradient={step.gradient}
              shadowColor={step.shadowColor}
              delay={index * 0.15}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className={`text-2xl font-bold text-white mb-2 ${poppins.className}`}>Ready to showcase your talent?</h3>
              <p className="text-neutral-300">Join thousands of designers competing in our battles</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/battles')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium"
            >
              Browse All Contests
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};