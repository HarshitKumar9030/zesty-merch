"use server";

import { connectDB } from "@/libs/mongodb";
import { Orders } from "@/models/Orders";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import {
  EnrichedProducts,
  OrderDocument,
  OrdersDocument,
  ProductsDocument,
  VariantsDocument,
  CustomDesignDocument
} from "@/types/types";
import { Product } from "@/models/Products";
import Stripe from "stripe";
import { emptyCart, getItems } from "@/app/(carts)/cart/action";

connectDB();

export const getUserOrders = async () => {
  try {
    const session: Session | null = await getServerSession(authOptions);
    const userId = session?.user._id;
    const userOrders: OrdersDocument | null = await Orders.findOne({ userId });

    if (userOrders && userOrders.orders && userOrders.orders.length > 0) {
      userOrders.orders.sort((a: OrderDocument, b: OrderDocument) => {
        const dateA = new Date(a.purchaseDate.toString());
        const dateB = new Date(b.purchaseDate.toString());
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      console.log("No orders found for userId:", userId);
    }

    return userOrders;
  } catch (error) {
    console.error("Error getting orders:", error);
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const session: Session | null = await getServerSession(authOptions);
    const userId = session?.user._id;
    const userOrders: OrdersDocument | null = await Orders.findOne({ userId });
    const orderFound: OrderDocument | undefined = userOrders?.orders.find(
      (order: OrderDocument) => order._id.toString() === orderId.toString()
    );

    if (!orderFound) {
      return null;
    }

    const enrichedProducts = await Promise.all(
      orderFound.products.map(async (product: ProductsDocument) => {
        const matchingProduct = await Product.findById(product.productId);
        if (matchingProduct) {
          const matchingVariant = matchingProduct.variants.find(
            (variant: VariantsDocument) => variant.color === product.color
          );
          if (matchingVariant) {
            const designId = Array.isArray(product.designId)
              ? product.designId
              : product.designId
              ? [product.designId]
              : [];

            return {
              productId: matchingProduct._id,
              name: matchingProduct.name,
              category: matchingProduct.category,
              image: [matchingVariant.images[0]],
              price: matchingProduct.price,
              purchased: true,
              color: product.color,
              size: product.size,
              quantity: product.quantity,
              designId: designId,
              _id: product.productId.toString(),
            };
          } else {
            console.log("No matching variant found for productId:", product.productId);
          }
        } else {
          console.log("No matching product found for productId:", product.productId);
        }
        return null;
      })
    );

    const filteredEnrichedProducts = enrichedProducts.filter(
      (product) => product !== null
    );


    const enrichedOrder = {
      name: orderFound.name,
      email: orderFound.email,
      phone: orderFound.phone,
      address: orderFound.address,
      products: filteredEnrichedProducts,
      orderId: orderFound.orderId,
      purchaseDate: orderFound.purchaseDate,
      expectedDeliveryDate: orderFound.expectedDeliveryDate,
      total_price: orderFound.total_price,
      orderNumber: orderFound.orderNumber,
      _id: orderFound._id,
    };

    console.log("Returning enriched order:", enrichedOrder);
    return enrichedOrder;
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
};

export const saveOrder = async (data: Stripe.Checkout.Session) => {
  try {
    const userId = data.metadata?.userId;
    if (!userId || !data) {
      console.error("Missing information: userId or session data.");
      return null;
    }

    const cart = await getItems(userId);
    if (!cart) {
      console.error("Products or cart not found for userId:", userId);
      return null;
    }

    const products = cart.map((item) => {
      const designIds = Array.isArray(item.designId)
        ? item.designId
        : item.designId
        ? [item.designId]
        : [];

      return {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image,
        designId: designIds.length > 0 ? designIds : undefined,
      };
    });

    const newOrder: any = {
      name: data.customer_details?.name,
      email: data.customer_details?.email,
      phone: data.customer_details?.phone,
      address: {
        line1: data.customer_details?.address?.line1,
        line2: data.customer_details?.address?.line2,
        city: data.customer_details?.address?.city,
        state: data.customer_details?.address?.state,
        postal_code: data.customer_details?.address?.postal_code,
        country: data.customer_details?.address?.country,
      },
      products: products,
      orderId: data.id,
      total_price: data.amount_total,
    };


    const userOrders: OrdersDocument | null = await Orders.findOne({ userId });

    if (userOrders) {
      const orderIdMatch = userOrders.orders.some(
        (order: OrderDocument) => order.orderId === data.id
      );
      if (!orderIdMatch) {
        userOrders.orders.push(newOrder);
        await Orders.findOneAndUpdate({ userId: userId }, userOrders, {
          new: true,
        });
      } else {
        console.info("This order has already been saved.");
      }
    } else {
      await Orders.create({ userId, orders: [newOrder] });
      console.info("New order document created and saved successfully.");
    }

    await emptyCart(userId);
  } catch (error) {
    console.error("Error saving the order:", error);
  }
};
