"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { Schema } from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { Product } from "@/models/Products";
import { EnrichedProducts, VariantsDocument } from "@/types/types";
import { connectDB } from "@/libs/mongodb";

export type Cart = {
  userId: string;
  items: Array<{
    productId: Schema.Types.ObjectId;
    size: string;
    variantId: string;
    quantity: number;
    price: number;
    designId?: string[];
  }>;
};

export async function getTotalItems(session: Session | null) {
  const cart: Cart | null = await kv.get(`cart-${session?.user._id}`);
  const total: number =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return total;
}

export async function getItems(userId: string) {
  connectDB();

  if (!userId) {
    console.error("User Id not found.");
    return undefined;
  }

  const cart: Cart | null = await kv.get(`cart-${userId}`);

  if (cart === null) {
    console.warn("Cart is null for userId:", userId);
    return undefined;
  }

  const updatedCart: EnrichedProducts[] = [];
  for (const cartItem of cart.items) {
    try {
      if (cartItem.productId && cartItem.variantId) {
        const matchingProduct = await Product.findById(cartItem.productId);
        if (!matchingProduct) {
          console.error("Product not found for productId:", cartItem.productId);
          continue;
        }


        const matchingVariant = matchingProduct.variants.find(
          (variant: VariantsDocument) =>
            variant.priceId === cartItem.variantId
        );

        if (!matchingVariant) {
          console.error("Variant not found for variantId:", cartItem.variantId);
          continue;
        }


        const designId = cartItem.designId || [];
        if (!Array.isArray(designId)) {
          console.error("designId is not an array:", designId);
          continue;
        }

        const updatedCartItem: EnrichedProducts = {
          ...cartItem,
          color: matchingVariant.color as string,
          category: matchingProduct.category,
          image: [matchingVariant.images[0]] as string[],
          name: matchingProduct.name,
          purchased: false,
          _id: matchingProduct._id.toString(),
          designId: designId,
        };

        updatedCart.push(updatedCartItem);
      } else {
        console.warn("Cart item is missing productId or variantId:", cartItem);
      }
    } catch (error) {
      console.error("Error processing cart item:", cartItem, error);
    }
  }

  return updatedCart;
}


export async function addItem(
  category: string,
  productId: Schema.Types.ObjectId,
  size: string,
  variantId: string,
  price: number,
  designId?: string[]
) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user._id) {
    console.error("User Id not found.");
    return;
  }

  const userId = session.user._id;
  let cart: Cart | null = await kv.get(`cart-${userId}`);

  let myCart: Cart;

  const newDesignIds = Array.isArray(designId) ? designId : designId ? [designId] : [];

  if (!cart || !cart.items) {
    myCart = {
      userId: userId,
      items: [
        {
          productId: productId,
          size: size,
          variantId: variantId,
          quantity: 1,
          price: price,
          designId: newDesignIds.length > 0 ? newDesignIds : undefined,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart = {
      userId: userId,
      items: cart.items.map((item) => {
        if (
          item.productId.toString() === productId.toString() &&
          item.variantId === variantId &&
          item.size === size
        ) {
          itemFound = true;
          return {
            ...item,
            quantity: item.quantity + 1,
            designId: [...(item.designId || []), ...newDesignIds], 
          };
        }
        return item;
      }) as Cart["items"],
    };

    if (!itemFound) {
      myCart.items.push({
        productId: productId,
        size: size,
        variantId: variantId,
        quantity: 1,
        price: price,
        designId: newDesignIds.length > 0 ? newDesignIds : undefined,
      });
    }
  }

  await kv.set(`cart-${userId}`, myCart);
  revalidatePath(`/${category}/${productId}`);
}

export async function delItem(
  productId: Schema.Types.ObjectId,
  size: string,
  variantId: string
) {
  const session: Session | null = await getServerSession(authOptions);
  const userId = session?.user._id;
  let cart: Cart | null = await kv.get(`cart-${userId}`);

  if (cart && cart.items) {
    const updatedCart = {
      userId: userId,
      items: cart.items.filter(
        (item) =>
          !(
            item.productId.toString() === productId.toString() &&
            item.variantId === variantId &&
            item.size === size
          )
      ),
    };

    await kv.set(`cart-${userId}`, updatedCart);
    revalidatePath(`/cart`);
  }
}

export async function delOneItem(
  productId: Schema.Types.ObjectId,
  size: string,
  variantId: string
) {
  try {
    const session: Session | null = await getServerSession(authOptions);
    const userId = session?.user._id;
    let cart: Cart | null = await kv.get(`cart-${userId}`);

    if (cart && cart.items) {
      const updatedCart = {
        userId: userId,
        items: cart.items
          .map((item) => {
            if (
              item.productId.toString() === productId.toString() &&
              item.variantId === variantId &&
              item.size === size
            ) {
              if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return null;
              }
            }
            return item;
          })
          .filter(Boolean) as Cart["items"],
      };

      await kv.set(`cart-${userId}`, updatedCart);
      revalidatePath("/cart");
    }
  } catch (error) {
    console.error("Error in delOneItem:", error);
  }
}

export const emptyCart = async (userId: string) => {
  try {
    let cart: Cart | null = await kv.get(`cart-${userId}`);

    if (cart && cart.items) {
      cart.items = [];
      await kv.set(`cart-${userId}`, cart);
      revalidatePath("/cart");
      console.log("Cart emptied successfully.");
    } else {
      console.log("Cart is already empty.");
    }
  } catch (error) {
    console.error("Error emptying cart:", error);
  }
};
