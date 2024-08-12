"use client";

import { ProductImages } from "@/components/products/ProductImages";
import { ProductDocument, VariantsDocument } from "@/types/types";
import { Session } from "next-auth";
import { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Skeleton } from "../ui/skeleton";
import dynamic from "next/dynamic";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddToCart from "../cart/AddToCart";
import Link from "next/link";
interface SingleProduct {
  product: string;
  session: Session | null;
}

export const SingleProduct = ({ product, session }: SingleProduct) => {

  const Customize = dynamic(() => import("../../components/ui/customize"), {
    loading: () => <Skeleton className="w-5 h-5" />,
  });
  const productPlainObject: ProductDocument = JSON.parse(product);
  const customizeLink = `/customize/${productPlainObject._id}`;

  const [selectedVariant, setSelectedVariant] = useState<VariantsDocument>(
    productPlainObject.variants[0]
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      <div className="grow-999 basis-0">
        <ProductImages
          name={productPlainObject.name}
          selectedVariant={selectedVariant}
        />
      </div>

      <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
        <div className="rounded-lg w-full p-1 bg-gradient-to-r to-purple-600 from-pink-600">
          <div className="w-full  rounded bg-background-secondary">
            <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary">
             <div className="flex gap-3 justify-between items-center ">
              <h1 className="text-base lg:text-lg font-semibold">
                {productPlainObject.name}
              </h1>
              <Link href={customizeLink}>
                  <Customize ExtraclassName={"p-1 items-center duration-300 border border-neutral-800 justify-center rounded-md bg-neutral-700 hover:bg-neutral-900 transition-all"} />
                </Link>
             </div>
              <div className="relative mb-6">
                <span className=" absolute text-sm px-4  py-1 rounded-xl bg-neutral-700">
                  {productPlainObject.price} ₹
                </span>
              </div>
              <p className="text-sm">{productPlainObject.description}</p>
            </div>

            <AddToCart
              session={session}
              product={productPlainObject}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
            />
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">COMPOSITION</AccordionTrigger>
            <AccordionContent>
              <p>
                We are committed to upholding the highest standards of social,
                environmental, and health and safety practices in our products.
                To ensure compliance, we have implemented comprehensive
                monitoring programs, which include rigorous audits and
                continuous improvement plans. These initiatives help us to
                consistently meet and exceed our ethical and sustainability
                goals, ensuring that our products are made responsibly and
                sustainably.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">CARE</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                Caring for your clothes is not just about maintaining their
                appearance, but also about protecting the environment.
              </p>
              <p>
                Washing at lower temperatures and using delicate spin cycles are
                essential steps in preserving the color, shape, and texture of
                your garments. This gentle approach minimizes wear and tear,
                ensuring your clothes last longer. Additionally, these practices
                significantly reduce energy consumption, contributing to a more
                sustainable and eco-friendly lifestyle.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">ORIGIN</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                We collaborate closely with our suppliers, workers, unions, and
                international organizations to foster a supply chain that
                respects and promotes human rights. This initiative aligns with
                our commitment to the United Nations Sustainable Development
                Goals, ensuring ethical practices throughout our operations.
              </p>
              <p>
                Through strong partnerships with our suppliers, we gain insights
                into the facilities and processes involved in the production of
                our goods. This collaboration enhances our understanding of
                product traceability, allowing us to maintain high standards of
                quality and responsibility.
              </p>
              <p>Made in India</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
