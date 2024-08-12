import { Suspense } from "react";
import { Products } from "../components/products/Products";
import { getAllProducts } from "./actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Hero } from "@/components/ui/hero";
import { Card } from "@/components/ui/card"
import { Special } from "@/components/ui/Special"
import { Text } from "@/components/ui/text"
import { Mails } from "@/components/ui/mails"
import { Speaker } from "lucide-react";
import PoweredBy from "../components/ui/poweredby";

const Home = async () => {
  return (
    <>
    <Hero />
    <PoweredBy />
    <Card />
    <Special />
    <Mails />
    <Text />
    </>
  );
};



export default Home;
