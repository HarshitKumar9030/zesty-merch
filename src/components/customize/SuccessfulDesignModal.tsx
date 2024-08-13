"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import type { Design } from "@canva/connect-api-ts/types.gen";
import { InformationCircleIcon, RefreshIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { Session } from "next-auth";
import { createDesign, getDesign } from "@/services";
import AddToCart from "../cart/AddToCart";
import { Tooltip } from "react-tooltip";
import { saveImage } from "@/app/customize/action";
import "react-tooltip/dist/react-tooltip.css";
import {
  CustomDesignDocument,
  ProductDocument,
  VariantsDocument,
  UserDocument,
} from "@/types/types";
import { addItem } from "@/app/(carts)/cart/action";
import { addDesign } from "@/app/actions";
import { useSession } from "next-auth/react";

interface CustomDesign {
  id: string | undefined;
  image: string;
  email: string;
  productId: string;
  editUrl: string | undefined;
}

interface SuccessfulDesignModalProps {
  product: string;
  isOpen: boolean;
  isLoading: boolean;
  createdDesign?: Design;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const SuccessfulDesignModal = ({
  product,
  isOpen,
  isLoading,
  createdDesign,
  onClose,
}: SuccessfulDesignModalProps) => {
  const productPlainObject: ProductDocument = JSON.parse(product);
  const [selectedVariant, setSelectedVariant] = useState<VariantsDocument>(
    productPlainObject.variants[0]
  );

  const [user, setUser] = useState<UserDocument>({} as UserDocument);
  const { data: session } = useSession();
  const [cloudinaryUrl, setcloudinaryUrl] = useState<string | null>(null);

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user as UserDocument);
    }
  }, [session]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isFetchingImage, setIsFetchingImage] = useState(false);
  const [isPending, startTransition] = useTransition();

  const CustomDesign: CustomDesign = {
    id: createdDesign?.id,
    image: cloudinaryUrl as string,
    email: user.email,
    productId: productPlainObject._id,
    editUrl: createdDesign?.urls.edit_url,
  };

  const handleCart = useCallback(() => {
    if (!imageUrl) {
      console.error("Image URL not available, cannot add to cart.");
      return;
    }

    const save = async (url: string) => {
      try {
        const savedUrl = await saveImage(url);
        setcloudinaryUrl(savedUrl as string);
        return savedUrl;
      } catch (error) {
        console.error("Error saving image:", error);
        return null;
      }
    };

    save(imageUrl).then((result) => {
      if (result) {
        startTransition(() => {
          addDesign({
            ...CustomDesign,
            image: result,
          } as any);
          addItem(
            productPlainObject.category,
            productPlainObject._id,
            productPlainObject.sizes[0],
            selectedVariant.priceId,
            productPlainObject.price,
            createdDesign?.id as string
          );
          onClose(false);
        });
      } else {
        console.error("Failed to save the image, cart update aborted.");
      }
    });
  }, [createdDesign, startTransition, session, product, imageUrl]);

  const handleDesign = useCallback(() => {
    if (!imageUrl) {
      console.error("Image URL not available, cannot save design.");
      return;
    }

    const save = async (url: string) => {
      try {
        const savedUrl = await saveImage(url);
        setcloudinaryUrl(savedUrl as string);
        return savedUrl;
      } catch (error) {
        console.error("Error saving image:", error);
        return null;
      }
    };

    save(imageUrl).then((result) => {
      if (result) {
        startTransition(() => {
          addDesign({
            ...CustomDesign,
            image: result, // Ensure image is set
          } as any);
          onClose(false);
        });
      } else {
        console.error("Failed to save the design. Operation aborted.");
      }
    });
  }, [createdDesign, startTransition, session, product, imageUrl]);

  const fetchImage = async () => {
    if (!createdDesign) return;
    setIsFetchingImage(true);

    try {
      const design = await getDesign({ designId: createdDesign.id });
      const imageUrl = design.thumbnail?.url ?? null;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching the image:", error);
    } finally {
      setIsFetchingImage(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative bg-neutral-900 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-sm w-full"
          >
            <button
              onClick={() => onClose(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-700 text-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-200 h-6 w-6"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            {isLoading && (
              <div className="flex items-center text-white justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-blue-500 mr-3"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  ></path>
                </svg>
                <p className="text-gray-200">
                  Please wait, your design is being created...
                </p>
              </div>
            )}
            {createdDesign && (
              <div>
                <p className="text-gray-200">
                  Hooray! Your design <strong>{createdDesign.title}</strong> has
                  been successfully created. You can now view it{" "}
                  <a
                    href={createdDesign.urls.edit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    here
                  </a>
                  .
                </p>
                <div className="text-gray-300 mt-4">
                  Please click the button below after you are done editing to
                  add it to your cart!
                </div>
                <div className="mt-6 mb-2 flex flex-row gap-2">
                  <button
                    title="Refresh"
                    className="px-2 py-2 rounded-lg transition-all ease-linear bg-neutral-700 hover:bg-neutral-800"
                    onClick={fetchImage}
                  >
                    <RefreshIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCart}
                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                      Add to Cart
                      <svg
                        fill="none"
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                  </button>
                  <div className="">
                    <button
                      data-tooltip-id="tooltipButton2"
                      data-tooltip-content="Create Design"
                      data-tooltip-place="top"
                      onClick={handleDesign}
                      className="bg-neutral-700 mr-6 duration-300 right-10 text-white py-2 px-2 rounded shadow-md hover:bg-neutral-800 absolute transition"
                    >
                      <svg
                        data-testid="geist-icon"
                        height="16"
                        strokeLinejoin="round"
                        viewBox="0 0 16 16"
                        width="16"
                        style={{ color: "currentcolor" }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8.75 4.25V5V7.25H11H11.75V8.75H11H8.75V11V11.75L7.25 11.75V11V8.75H5H4.25V7.25H5H7.25V5V4.25H8.75Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <Tooltip className="z-60" id="tooltipButton2" />
                    <button
                      data-tooltip-id="tooltipButton"
                      data-tooltip-content="Please wait 2-5 minutes after editing your design, as canva api takes time to sync."
                      data-tooltip-place="top"
                      className="bg-neutral-700 mr-6 duration-300 text-white py-2 px-2 rounded shadow-md hover:bg-neutral-800 absolute right-0 transition"
                    >
                      <InformationCircleIcon className="h-4 w-4" />
                    </button>
                    <Tooltip className="z-60" id="tooltipButton" />
                  </div>
                </div>
                <div className="mt-4">
                  {isFetchingImage ? (
                    <div className="w-full h-64 bg-gray-200 animate-pulse" />
                  ) : (
                    imageUrl && (
                      <Image
                        src={imageUrl}
                        alt="Design Image"
                        width={400}
                        height={400}
                        className="rounded-lg"
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
