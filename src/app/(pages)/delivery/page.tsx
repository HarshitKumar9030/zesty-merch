
import React from "react";
import { Metadata } from "next";
import DeliveryComponent from "@/components/ui/delivery";


export const metadata: Metadata = {
  title: "Delivery | Zesty Merch",
  description:
    "Delivery information for your products and other stuff.",
};

  

const DeliveryInfo = () => {
  return (
    <>
    <div className="font-semibold relative md:text-3xl text-xl mt-6 text-neutral-200">
        Delivery Information
    </div>
    <DeliveryComponent />
    </>
  );
};

export default DeliveryInfo;