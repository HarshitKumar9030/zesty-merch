import { Suspense } from "react";
import { Products } from "../../components/products/Products";
import { getAllProducts } from "../actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

const Page = async () => {
  return (
    <section className="pt-14">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
      >
        <AllProducts />
      </Suspense>
    </section>
  );
};

const AllProducts = async () => {
  const products = await getAllProducts();

  return <Products products={products} extraClassname="" />;
};

export default Page;
