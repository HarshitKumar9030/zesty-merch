import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "./Providers";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SmoothScrollProvider } from "@/providers/scroll-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getTotalItems } from "./(carts)/cart/action";
import { getTotalWishlist } from "./(carts)/wishlist/action";
import { Nav } from "@/components/ui/navbar";
import { ContextProvider } from "@/context";
import { Toaster as Tster } from "@/components/ui/toaster";


import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Zesty Merch",
  description: "Your go-to destination for custom merchandise and unique designs.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);
  const totalItemsCart = await getTotalItems(session);
  const totalItemsWishlists = await getTotalWishlist();

  return (
    <html lang="en">
      <Providers>
        <ContextProvider>
          <SmoothScrollProvider>
            <body className={GeistSans.className}>
              <Navbar
                session={session}
                totalItemsCart={totalItemsCart}
                totalWishlists={totalItemsWishlists?.items.length}
              />
              <Nav />
              <main className="pointer-events-auto">
                {children}
                <Toaster position="top-right" />
                <Tster />
                <Analytics />
                <SpeedInsights />
              </main>
              <Footer />
            </body>
          </SmoothScrollProvider>
        </ContextProvider>
      </Providers>
    </html>
  );
}
