"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconBrandProducthunt, IconBuildingStore, IconHeart, IconHome, IconMessage, IconShoppingCart, IconShoppingCartBolt, IconSwords, IconUser } from "@tabler/icons-react";
import { Icon } from "lucide-react";
export function Nav() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 ttext-white" />,
    },
    {
      name: "Products",
      link: "/products",
      icon: (
        <IconBuildingStore className="h-4 w-4 text-white" />
      ),
    },
    {
      name: "Battles",
      link: "/battles",
      icon: (
          <IconSwords className="h-4 w-4 text-white"/>
      ),
    },
    {
        name: "Cart",
        link: "/cart",
        icon: (
            <IconShoppingCart className="h-4 w-4 text-white"/>
        ),
    },
    {
        name: "Wishlist",
        link: "/wishlist",
        icon: (
            <IconHeart className="h-4 w-4 text-white"/>
        ),
    },
    
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
