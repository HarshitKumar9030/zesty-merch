"use client";

import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 w-full bg-grid-white/10">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Privacy Policy
      </h1>
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg text-neutral-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p>
            At Zesty Merch, we value your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and safeguard your data when you use our
            website and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Collection</h2>
          <p>
            We collect personal information necessary to process your orders,
            manage your account, and provide a better shopping experience. This
            includes your name, email address, shipping address, and payment
            information. We also collect data related to your interactions with
            our website, such as design submissions and contest entries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
          <p>
            When you create an account on Zesty Merch, you are responsible for
            maintaining the confidentiality of your account information. Please
            note that accounts cannot be closed once created unless under
            special circumstances. For assistance with account closure, please
            visit our{" "}
            <Link href="/contact" className="text-purple-400 underline">
              Contact
            </Link>{" "}
            page and select the &quot;Technical Help&quot; option.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Designs and Content</h2>
          <p>
            We store the designs you create on Zesty Merch as long as they are
            not deleted by you. You can manage and delete your designs from the
            Designs page on your account. We do not use or share your designs
            without your explicit consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Usage</h2>
          <p>
            The personal data we collect is used to process your orders, provide
            customer support, and improve our services. We may also use your
            data to send you promotional emails and updates about Zesty Merch.
            You can opt out of these communications at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
          <p>
            We implement a variety of security measures to protect your personal
            information from unauthorized access, disclosure, or alteration. Our
            website uses SSL encryption to ensure that your data is transmitted
            securely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
          <p>
            We may share your data with trusted third-party services that assist
            us in operating our website, processing payments, or delivering
            products. These third parties are obligated to keep your information
            confidential and secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
          <p>
            Zesty Merch uses cookies to enhance your browsing experience. These
            cookies help us understand your preferences and provide a more
            personalized service. You can choose to disable cookies through your
            browser settings, but this may affect the functionality of our
            website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data
            at any time. If you wish to exercise these rights, please contact us
            through our{" "}
            <Link href="/contact" className="text-purple-400 underline">
              Contact
            </Link>{" "}
            page. We will respond to your request within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. Any updates will be
            posted on this page, and we encourage you to review our Privacy
            Policy regularly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us through our{" "}
            <Link href="/contact" className="text-purple-400 underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
