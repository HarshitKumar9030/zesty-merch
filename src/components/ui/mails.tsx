// @ts-nocheck 

"use client";
import React, { useState, useRef } from "react";
import { BackgroundBeams } from "./background-beams";
import { subscribeToNewsletter } from "@/app/actions"; 

export function Mails() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;

    if (email) {
      try {
        const result = await subscribeToNewsletter(email);
        setMessage(result.message);
        if (emailRef.current) {
          emailRef.current.value = ""; // Clear the input field
        }
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage("Please enter a valid email address.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[40rem] w-full bg-neutral-950 rounded-xl antialiased">
      <BackgroundBeams />
      <div className="relative z-10 max-w-2xl mx-auto p-6">
        <h1 className="text-center font-sans lg:h-16 font-bold text-2xl md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-600">
          Newsletter
        </h1>
        <p className="my-4 max-w-lg mx-auto text-center text-sm text-neutral-300 leading-relaxed">
          Join our mailing list to receive the latest updates, exclusive offers, and news about Zesty Merch. Whether you&apos;re looking for new product launches or special discounts, we’ve got you covered. Be the first to know and never miss out on our exciting offers!
        </p>
        <form onSubmit={handleSubscribe}>
          <input
            ref={emailRef} // Reference to the input field
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="w-full mt-4 py-3 px-4 placeholder:text-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
          <button
            type="submit"
            className={`w-full mt-4 py-3 bg-teal-500 rounded-lg text-neutral-950 font-semibold hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-neutral-400">{message}</p>}
      </div>
    </div>
  );
}
