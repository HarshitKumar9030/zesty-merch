import { CustomerSupportInfo } from "@/components/contact/CustomerInfo";
import { ContactHero } from "@/components/contact/Hero";
import { Mails } from "@/components/ui/mails";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Contact | Zesty Merch",
  description: "Contact Page for Zesty Merch",
};

export default function Contact() {
  return (
    <>
      <div className="bg-grid-white/5">
        <ContactHero />
        <CustomerSupportInfo />
        <div className="mt-24">
          <div className="h-[40rem] rounded-lg bg-neutral-900 flex flex-col items-center justify-center relative w-full">
            <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              <span>Zesty Merch</span>
              <span className="text-white text-lg font-thin">x</span>
              <span>Stellar Style</span>
            </h2>
            <ShootingStars />
            <StarsBackground />
            <div className="relative z-10 mt-8 items-center justify-center flex space-x-4">
              <Link
                href="/register"
                className="px-6 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl opacity-80 hover:opacity-100 shadow-lg hover:scale-105 transition transform duration-300"
              >
                Register
              </Link>
              <Link
                href="/products"
                className="px-6 py-1.5 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-2xl opacity-80 hover:opacity-100 shadow-lg hover:scale-105 transition transform duration-300"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8">
            <Mails />
        </div>
      </div>
    </>
  );
}
