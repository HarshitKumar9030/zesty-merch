"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocalStorage } from "react-use";

// Break out modal content into separate components for better organization
interface ModalSectionProps {
  title: string;
  children: React.ReactNode;
}

const ModalSection = ({ title, children }: ModalSectionProps) => (
  <div className="mb-8">
    <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-300">
      {title}
    </h3>
    {children}
  </div>
);

interface NavItemProps {
  path: string;
  description: string;
}

const NavItem = ({ path, description }: NavItemProps) => (
  <li className="mb-3">
    <strong className="text-purple-200">{path}:</strong>{" "}
    <span className="text-gray-400">{description}</span>
  </li>
);

const FlyingBee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dismissed, setDismissed] = useLocalStorage("bee-dismissed", false);
  const [animationPaused, setAnimationPaused] = useState(false);
  
  // Reset the dismissed state after 3 days
  useEffect(() => {
    const checkDismissed = () => {
      const dismissedTime = localStorage.getItem("bee-dismissed-time");
      if (dismissedTime) {
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
        if (Date.now() - parseInt(dismissedTime) > threeDaysInMs) {
          setDismissed(false);
          localStorage.removeItem("bee-dismissed-time");
        }
      }
    };
    
    checkDismissed();
  }, [setDismissed]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const dismissBee = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setDismissed(true);
    localStorage.setItem("bee-dismissed-time", Date.now().toString());
  };

  // Pause animation when tab is not visible to improve performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setAnimationPaused(document.hidden);
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (e: { key: string; }) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (dismissed) return null;

  return (
    <>
      <motion.div
        className="fixed bottom-10 right-10 w-16 h-16 z-[999] flex items-center justify-center cursor-pointer"
        animate={!animationPaused ? {
          y: [0, -10, 10, -5, 5, 0],
          x: [0, -10, 10, -5, 5, 0],
          rotate: [0, 10, -10, 5, -5, 0],
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        onClick={toggleModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.2 }}
        role="button"
        aria-label="Open Help Guide"
        tabIndex={0}
      >
        <div className="relative">
          <div className={`absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
               onClick={dismissBee}
               onKeyDown={(e) => e.key === 'Enter' && dismissBee(e)}
               tabIndex={0}
               role="button"
               aria-label="Dismiss bee helper"
          >
            <X size={12} />
          </div>
          
          <div className="bg-yellow-400 rounded-full p-2 shadow-lg relative">
            <span className="text-3xl" role="img" aria-label="Bee">🐝</span>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 right-0 whitespace-nowrap bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded"
              >
                Help Guide
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={toggleModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            data-lenis-prevent
          >
            <motion.div
              className="bg-neutral-900 text-white rounded-2xl shadow-lg w-full max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto relative my-6 max-h-[90vh]"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10"
                onClick={toggleModal}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              
              <div className="h-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 custom-scrollbar" data-lenis-prevent>
                <div className="pt-2 pb-4">
                  <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-purple-400">
                    Welcome to Zesty Merch
                  </h2>
                  
                  <p className="mb-6 text-sm sm:text-lg leading-relaxed text-gray-300">
                    Zesty Merch is your go-to platform for creating personalized merchandise with ease. Here&apos;s everything you need to know:
                  </p>

                  <ModalSection title="Navigating the Site">
                    <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                      <NavItem path="/" description="Browse the latest products, offers, and featured designs." />
                      <NavItem path="/products" description="Customize your products using our integrated Canva tool." />
                      <NavItem path="/battles" description="Participate in design contests where creativity meets competition." />
                      <NavItem path="/cart" description="Review your customized products before checkout." />
                      <NavItem path="/profiles/your_username" description="View and customize your profile page." />
                      <NavItem path="/about" description="Learn more about Zesty Merch and our mission." />
                      <NavItem path="/customize/productId" description="Dive deep into customization with Canva." />
                      <NavItem path="/contact" description="Get assistance with FAQs and support resources." />
                    </ul>
                  </ModalSection>

                  <ModalSection title="Contests and Competitions">
                    <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                      Zesty Merch hosts regular design contests where you can showcase your creativity and compete with others. 
                      Winning designs earn recognition, prizes, and a chance to be featured on our platform.
                    </p>
                  </ModalSection>

                  <ModalSection title="Using the Canva Integration">
                    <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                      Our integration with Canva allows you to bring your ideas to life with professional design tools.
                      Simply choose a product, start designing, and let your imagination take over.
                    </p>
                  </ModalSection>

                  <ModalSection title="Managing Your Designs">
                    <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                      All designs you create are stored in your profile, allowing you to revisit, edit, or delete them at any time.
                      We value your creativity and provide the tools to manage your designs easily.
                    </p>
                  </ModalSection>

                  <div className="flex justify-center mt-6 space-x-4">
                    <button 
                      onClick={toggleModal}
                      className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                    >
                      Got it!
                    </button>
                    <button 
                      onClick={(e) => {
                        dismissBee(e);
                        toggleModal();
                      }}
                      className="px-6 py-2 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white rounded-lg transition-colors"
                    >
                      Don&apos;t show again
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>
    </>
  );
};

export default FlyingBee;