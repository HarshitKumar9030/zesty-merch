import { getProduct } from "@/app/actions";
import { ProductDocument } from "@/types/types";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";

const CustomizeForm = dynamic(() => import("../../../components/customize/CustomizeForm"), {
  loading: () => <ProductSkeleton extraClassname="" numberProducts={6} />,
});

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
    return;
  }

  const session: Session | null = await getServerSession(authOptions);
  const product: ProductDocument | undefined | null = await getProduct(params.id);
  if (!product) {
    notFound(); 
    return;
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedName = capitalizeFirstLetter(product?.name);

  return {
    title: `${capitalizedName} | Zesty Merch`,
    description: `Customize ${capitalizedName}!`,
  };
}

const Customize = async ({ params }: Props) => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound(); 
    return;
  }

  const product: ProductDocument | null | undefined = await getProduct(params.id);
  if (!product) {
    notFound(); 
    return;
  }

  const productJSON = JSON.stringify(product);

  return (
    <section className="pt-14">
      <Suspense fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}>
        <CustomizeForm product={productJSON} />
      </Suspense>
    </section>
  );
};

export default Customize;
