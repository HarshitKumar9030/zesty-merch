import { cn } from "@/libs/utils";
import {
  IconClothesRack,
  IconHeart,
    IconBrush,
    IconTruckDelivery,
    IconCreditCard,
    IconBox,
    IconShieldCheck,
    IconSwords,
    IconHelpOctagon,
    
} from "@tabler/icons-react";

export function Features() {
    const features = [
        {
          title: "Quality Merchandise",
          description: "Crafted with the finest materials, designed to last, and styled to impress.",
          icon: <IconClothesRack />,
        },
        {
          title: "Custom Designs",
          description: "Personalize your products with your own designs or choose from our curated collections.",
          icon: <IconBrush />,
        },
        {
          title: "Free Shipping",
          description: "Enjoy free standard shipping on all orders. No hidden fees, no surprises.",
          icon: <IconTruckDelivery />,
        },
        {
          title: "Secure Payments",
          description: "Your transactions are protected with top-notch security. Shop with confidence.",
          icon: <IconCreditCard />,
        },
        {
          title: "Easy Support",
          description: "Having Issues, why worry navigate to our contact page and send us a message ;)",
          icon: <IconHelpOctagon />,
        },
        {
          title: "Customer Love",
          description: "We value our customers and are here to ensure your shopping experience is flawless.",
          icon: <IconHeart />,
        },
        {
          title: "Trusted Quality",
          description: "All our products go through rigorous quality checks to ensure you get the best.",
          icon: <IconShieldCheck />,
        },
        {
            title: "Design Battles",
            description: "Compete with fellow designers to showcase your creativity and win exciting prizes. Join the battle and let your designs shine!",
            icon: <IconSwords />,
          },
      ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r bg-dot-neutral-700/25 py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
