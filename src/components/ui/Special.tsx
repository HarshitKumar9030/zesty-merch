"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

export function Special() {
  return (
    <div className="h-[50rem] bg-dot-white/[0.1] rounded-lg w-full my-8">
    <CardContainer className="inter-var  p-4">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.2] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          Customize Your Merchandise
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-sm mt-2 text-neutral-300"
        >
          Use our powerful design tool to create unique T-shirts, mugs, and more. Add your own images, text, and designs with ease. Click on the pencil Icon to start customizing!
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="custom merchandise"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/products"
            className="px-4 py-2 rounded-xl text-xs font-normal text-white"
          >
            Start Designing →
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href="/register"
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
          >
            Sign Up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </div>
  );
}
