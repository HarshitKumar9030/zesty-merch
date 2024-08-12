"use client";

import React from "react";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-6 bg-grid-white/10 w-full">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Terms of Service
      </h1>
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg text-neutral-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p>
            Welcome to Zesty Merch. These terms and conditions outline the rules
            and regulations for the use of our website and services. By
            accessing this website, you agree to comply with and be bound by
            these terms. If you disagree with any part of the terms, please do
            not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Products</h2>
          <p>
            Zesty Merch offers a wide range of customizable products, including
            apparel, accessories, and more. Our products can be customized using
            Canva integration, allowing you to create unique designs directly on
            our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contests</h2>
          <p>
            Zesty Merch hosts design contests where users can submit their
            custom designs to compete for prizes. All entries must comply with
            the contest rules, which will be outlined in each contest&apos;s specific
            details. Users retain ownership of their designs submitted to
            contests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Canva Integration
          </h2>
          <p>
            Our platform integrates with Canva to provide you with powerful
            design tools. When you use Canva through our website, you agree to
            Canva’s terms of service. Zesty Merch does not store or use the
            designs you create on Canva; they are solely used for the purpose of
            creating and purchasing custom products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Privacy</h2>
          <p>
            Your privacy is important to us. We do not store, use, or share any
            of your designs or personal data beyond what is necessary to process
            your orders and improve our services. Please review our{" "}
            <Link href="/privacy-policy" className="text-purple-400 underline">
              Privacy Policy
            </Link>{" "}
            for more information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
          <p>
            To use certain features of our website, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account information, and you agree to accept
            responsibility for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Purchases</h2>
          <p>
            All purchases made through Zesty Merch are subject to our payment
            and shipping terms. Prices are subject to change without notice, and
            we reserve the right to modify or discontinue any product at any
            time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Limitation of Liability
          </h2>
          <p>
            Zesty Merch shall not be held liable for any damages that may occur
            as a result of using our services. This includes, but is not limited
            to, direct, indirect, incidental, punitive, and consequential
            damages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to make changes to these terms at any time.
            Your continued use of our website following any changes will
            constitute your acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <Link href="/contact" className="text-purple-400 underline">
              our contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
