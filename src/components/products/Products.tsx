// @ts-nocheck 

import Link from "next/link";
import { Images } from "./Images";
import { EnrichedProducts, CustomDesignDocument } from "@/types/types";
import dynamic from "next/dynamic";
import { cn } from "@/libs/utils";
import { Skeleton } from "../ui/skeleton";
import { Wishlists, getTotalWishlist } from "@/app/(carts)/wishlist/action";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { getMostRecentCustomDesign } from "@/app/actions";

const WishlistButton = dynamic(() => import("../cart/WishlistButton"), {
  loading: () => <Skeleton className="w-5 h-5" />,
});

const DeleteButton = dynamic(() => import("../cart/DeleteButton"), {
  loading: () => <Skeleton className="w-5 h-5" />,
});

const ProductCartInfo = dynamic(() => import("../cart/ProductCartInfo"), {
  loading: () => <Skeleton className="w-24 h-8" />,
});

const Customize = dynamic(() => import("../../components/ui/customize"), {
  loading: () => <Skeleton className="w-5 h-5" />,
});

export const Products = async ({
  products,
  extraClassname = "",
}: {
  products: EnrichedProducts[];
  extraClassname: string;
}) => {
  const session: Session | null = await getServerSession(authOptions);
  const hasMissingQuantity = products.some((product) => !product.quantity);
  const wishlist =
    hasMissingQuantity && session?.user ? await getTotalWishlist() : undefined;

  const gridClassname = [
    "grid gap-x-3.5 gap-y-6 sm:gap-y-9",
    extraClassname === "colums-mobile" && "grid-cols-auto-fill-110",
    extraClassname === "cart-ord-mobile" && "grid-cols-1",
    "sm:grid-cols-auto-fill-250",
  ]
    .filter(Boolean)
    .join(" ");

  const recentCustomDesigns: { [key: string]: CustomDesignDocument | null } = {};

  if (session?.user) {
    for (const product of products) {
      const customDesign = await getMostRecentCustomDesign(session.user.email, product._id.toString());
      recentCustomDesigns[product._id.toString()] = customDesign;
    }
  }

  return (
    <div className={gridClassname}>
      {products.map((product, index) => {
        const {
          _id,
          category,
          quantity,
          image,
          name,
          price,
          purchased,
        } = product;

        let nameN = name;
        let displayImages = [...image];
        const recentDesign = recentCustomDesigns[_id.toString()];
        if (recentDesign) {
          const designCreatedAt = new Date(recentDesign.createdAt).getTime();
          const now = new Date().getTime();
          const timeDiff = (now - designCreatedAt) / 1000 / 60;
          if (timeDiff <= 10) {
            nameN = `${name} Customized`;
            displayImages[0] = recentDesign.image; //Replacing first image with CustomDesign
          }
        }

        const productLink = `/${category}/${_id}`;
        const customizeLink = `/customize/${_id}`;
        const containerClassname = [
          cn(
            "flex justify-between w-full bg-gradient-to-r from-cyan-600 to-purple-700 rounded-lg p-1 overflow-hidden",
            extraClassname === "cart-ord-mobile"
              ? "flex-col"
              : "flex-col"
          ),
        ]
          .filter(Boolean)
          .join(" ");
        const linkClassname =
          extraClassname === "cart-ord-mobile"
            ? "w-full mb-1 border border-black overflow-hidden rounded-lg transition-all"
            : "transition-all rounded-lg border-2 border-neutral-900 overflow-hidden mb-1";
        const infoClassname = [
          extraClassname === "cart-ord-mobile" ? "w-full" : "",
          "flex justify-between flex-col rounded-lg gap-2.5 p-3.5 bg-background-secondary z-10",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div className={containerClassname} key={index}>
            <Link href={productLink} className={linkClassname}>
              <Images
                image={displayImages}
                name={name}
                width={280}
                height={425}
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1154px) 33vw, (max-width: 1536px) 25vw, 20vw"
              />
            </Link>
            <div className={infoClassname}>
              <div className="flex justify-between w-full">
                <Link href={productLink} className="w-10/12">
                  <h2 className="text-sm font-semibold truncate">{nameN}</h2>
                </Link>
                <Link href={customizeLink}>
                  <Customize ExtraclassName="mr-2"/>
                </Link>
                {quantity ? (
                  purchased ? (
                    quantity > 1 && <span className="text-sm">{quantity}</span>
                  ) : (
                    <DeleteButton product={product} />
                  )
                ) : (
                  <WishlistButton
                    session={session}
                    productId={JSON.stringify(_id)}
                    wishlistString={JSON.stringify(wishlist)}
                  />
                )}
              </div>
              {!purchased && (
                <div className="block">
                  <span className="bg-zinc-700 rounded-full text-[0.8rem] px-2 py-1 text-white">
                    {quantity ? (price * quantity).toFixed(2) : price} ₹
                  </span>
                </div>
              )}
              {quantity !== undefined && <ProductCartInfo product={product} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};
