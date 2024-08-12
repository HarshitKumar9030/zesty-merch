"use client";

import { useState } from "react";
import { ProductDocument, VariantsDocument } from "@/types/types";
import { ProductImages } from "../products/ProductImages";
import { MovingBorder } from "@/components/ui/moving-border";
import { FlipWords } from "../ui/flip-words";
import { ConnectButton } from "../canva/connect-button";
import { ConnectionAlert } from "../canva/connectionAlert";
import { SuccessfulDesignModal } from "./SuccessfulDesignModal";
import type { Design } from "@canva/connect-api-ts/types.gen";
import { getProducts, uploadAssetAndCreateDesignFromProduct } from "@/services";
import type { Product } from "@/models";
import { DemoAlert } from "../canva/alert";
import { Session } from "next-auth";
import { useAppContext } from "@/context";

const CustomizeForm = ({ product, session }: any) => {
  const productPlainObject: ProductDocument = JSON.parse(product);
  const [selectedVariant, setSelectedVariant] = useState<VariantsDocument>(
    productPlainObject.variants[0]
  );
  const { displayName, isAuthorized } = useAppContext();
  const words = ["nice", "cute", "beautiful", "modern", "custom"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdDesign, setCreatedDesign] = useState<Design | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCreatedDesign(undefined)
  };

  const handleCreateDesignClick = async (product: Product) => {
    if (createdDesign) {
      openModal();
      return;
    }

    setIsLoading(true);
    openModal();

    try {
      const design = await uploadAssetAndCreateDesignFromProduct({ product });
      setCreatedDesign(design);
      openModal();
    } catch (error) {
      console.error(error);
      return (
        <DemoAlert
          alertTitle="Something went wrong creating the design."
          severity="error"
          alertBody="Please contact the admin."
        />
      );
    } finally {
      setIsLoading(false);
    }
  };

  const productWithImageUrl = {
    id: productPlainObject._id,
    price: productPlainObject.price,
    name: productPlainObject.name,
    imageUrl:
      "https://res.cloudinary.com/dz8sfaosb/image/upload/f_auto,c_limit,w_640,q_auto" +
      selectedVariant?.images[0],
  };

  return (
    <>
      <ConnectionAlert />
      <div className="p-6 bg-neutral-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Customize {productPlainObject.name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="w-full flex justify-center items-center">
            <ProductImages
              name={productPlainObject.name}
              selectedVariant={selectedVariant}
            />
          </div>
          <div className="flex flex-col relative justify-center items-center overflow-hidden bg-background-secondary rounded-md shadow-lg">
            <div className="absolute overflow-hidden md:h-48 md:w-48 w-36 h-36 -top-12 bg-clip-content -right-12 rounded-full bg-pink-600"></div>
            <div className="absolute overflow-hidden md:h-56 md:w-56 h-40 w-40 -bottom-12 bg-clip-content -left-12 rounded-full bg-orange-600"></div>

            <div className="relative before:absolute before:bg-purple-600 text-2xl mb-8 before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500">
              <span className="relative">Customize with Canva</span>
            </div>
            <ConnectButton />
            {isAuthorized ? (
              <div className="flex lg:flex-row mb-4 flex-col mt-8 gap-4">
                <button
                  onClick={() => handleCreateDesignClick(productWithImageUrl)}
                  className="p-[3px] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-6 py-2 bg-neutral-900 rounded-[6px] relative group transition duration-200 text-white ease-linear hover:bg-transparent">
                    Customize this Product ➡️
                  </div>
                </button>
              </div>
            ) : (
              <div className="h-[7rem] z-10 text-center mt-4 flex justify-center items-center px-4">
                <div className="text-3xl mx-auto font-normal text-neutral-400">
                  Design
                  <FlipWords words={words} /> <br />
                  Products only on{" "}
                  <span className="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:translate-y-1 after:opacity-0 hover:after:translate-y-0 hover:after:opacity-100 after:transition after:ease-in-out after:duration-200">
                    Zesty Merch
                  </span>
                </div>
              </div>
            )}
            <SuccessfulDesignModal
              product={product}
              isOpen={isModalOpen}
              isLoading={isLoading}
              createdDesign={createdDesign}
              onClose={closeModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizeForm;
