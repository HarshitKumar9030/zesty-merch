"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FlyingBee = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        className="fixed top-10 right-10 w-16 h-16 z-[999] flex items-center justify-center cursor-pointer"
        animate={{
          y: [0, -20, 40, -60, 50, -30, 20, 0],
          x: [0, -50, 100, -150, 200, -250, 300, -350, 400, -450, 500, -550, 600],
          rotate: [0, 20, -20, 30, -30, 40, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        onClick={toggleModal}
      >
        <span className="text-5xl">🐝</span>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 overflow-y-auto flex items-center justify-center z-50"
            onClick={toggleModal}
          >
            <div className="absolute top-8">
            <motion.div
              className="bg-neutral-900 text-white rounded-2xl shadow-lg p-4 sm:p-12 w-full max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto relative overflow-auto"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center text-purple-400">
                Welcome to Zesty Merch
              </h2>
              <p className="mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed text-gray-300">
                Zesty Merch is your go-to platform for creating personalized merchandise with ease. Here&apos;s everything you need to know to get started and make the most of your experience:
              </p>

              <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-300">
                Navigating the Site
              </h3>
              <ul className="list-disc pl-4 sm:pl-6 mb-6 sm:mb-8 space-y-2 sm:space-y-4 text-sm sm:text-lg text-gray-400">
                <li>
                  <strong>/:</strong> Browse the latest products, offers, and featured designs. This is the starting point for exploring everything Zesty Merch has to offer.
                </li>
                <li>
                  <strong>/products:</strong> Customize your products using our integrated Canva tool. You can personalize items like T-shirts, mugs, and posters with your designs, making each piece unique.
                </li>
                <li>
                  <strong>/battles:</strong> Participate in our design contests where creativity meets competition. Submit your designs, vote on others, and see how you rank on the leaderboard.
                </li>
                <li>
                  <strong>/cart:</strong> Review your customized products before checkout. Here, you can finalize your designs and ensure everything is perfect before placing your order.
                </li>
                <li>
                  <strong>/profiles/your_username:</strong> Checkout your very own profile page, customize it by going to the menu then edit profile in the navigation bar!
                </li>
                <li>
                  <strong>/about:</strong> Learn more about Zesty Merch, our mission, and what drives us to empower creators like you. Get insights into our journey and our commitment to quality and creativity.
                </li>
                <li>
                  <strong>/customize/productId:</strong> Dive deep into the customization process with Canva. This page provides all the tools and options you need to create stunning, personalized products.
                </li>
                <li>
                  <strong>/contact:</strong> Need assistance? Visit our faq contact for FAQs, contact information, and resources to help you with your orders, designs, and account management.
                </li>
              </ul>

              <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-300">
                Contests and Competitions
              </h3>
              <p className="mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed text-gray-300">
                Zesty Merch hosts regular design contests where you can showcase your creativity and compete with others. Winning designs earn recognition, prizes, and a chance to be featured on our platform. Make sure to check the contest page regularly for new opportunities and to track your progress.
              </p>

              <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-300">
                Using the Canva Integration
              </h3>
              <p className="mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed text-gray-300">
                Our integration with Canva allows you to bring your ideas to life with professional design tools. Whether you’re creating a simple graphic or a complex artwork, Canva makes the process seamless and intuitive. Simply choose a product, start designing, and let your imagination take over.
              </p>

              <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-300">
                Managing Your Designs
              </h3>
              <p className="mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed text-gray-300">
                All designs you create are stored in your profile, allowing you to revisit, edit, or delete them at any time. We value your creativity and provide the tools to manage your designs easily. If you wish to remove a design, you can do so directly from the designs page.
              </p>

              <p className="text-center text-sm sm:text-lg font-semibold text-gray-300">
                Enjoy your journey with Zesty Merch, and let your creativity soar! We&apos;re here to support you every step of the way.
              </p>
            </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FlyingBee;
