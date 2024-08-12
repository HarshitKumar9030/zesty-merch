"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/libs/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function LinksDesktop() {
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid z-50 gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none from-muted/50 to-muted focus:shadow-md bg-center bg-[url('/main.jpg')]"
                    href="/"
                  >
                    <div className="mt-4 mb-1 text-sm font-medium">
                      VIEW ALL
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover wardrobe staples for every occasion.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/t-shirts" title="T-SHIRTS">
                Discover our customizable T-shirts that let you express your
                unique style. Choose from a variety of designs, colors, and
                textures to create the perfect tee for any occasion.
              </ListItem>
              <ListItem href="/pants" title="PANTS">
                Find the perfect fit with our range of men&apos; pants. From
                classic chinos to contemporary joggers, our customizable options
                ensure you get the style and comfort you need.
              </ListItem>
              <ListItem href="/sweatshirts" title="SWEATSHIRTS">
                Customize your own sweatshirt with our wide selection of designs
                and colors. Perfect for staying comfortable and stylish, our
                sweatshirts are anything but basic.
              </ListItem>
              <ListItem href="/mugs" title="MUGS">
                Create your own personalized mug. Whether for your morning
                coffee or as a unique gift, our customizable mugs are designed
                to brighten your day.
              </ListItem>
              <ListItem href="/stickers" title="STICKERS">
                Add a personal touch to any surface with our customizable
                stickers. Choose from a variety of shapes, sizes, and designs to
                make your mark.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 z-50 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-[#1F1F1F]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-[]">
            {title}
          </div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground text-[#A1A1A1]">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
