import { Products } from "@/components/products/Products";
import { getCategoryProducts } from "../actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";
import { notFound } from "next/navigation";

type Props = {
  params: {
    category: string;
  };
};

const validCategories = [
  "t-shirts",
  "mugs",
  "stickers",
  "pants",
  "sweatshirts",
];

export async function generateMetadata({ params }: Props) {
  const { category } = params;

  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found | Zesty Merch",
      description: "The category you're looking for does not exist.",
    };
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedCategory = capitalizeFirstLetter(category);

  return {
    title: `${capitalizedCategory} | Zesty Merch`,
    description: `Explore the best ${capitalizedCategory} at Zesty Merch.`,
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = params;

  if (!validCategories.includes(category)) {
    notFound();
  }

  return (
    <section className="pt-14">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}
      >
        <CategoryProducts category={category} />
      </Suspense>
    </section>
  );
};

const CategoryProducts = async ({ category }: { category: string }) => {
  const products = await getCategoryProducts(category);

  return <Products products={products} extraClassname="" />;
};

export default CategoryPage;
