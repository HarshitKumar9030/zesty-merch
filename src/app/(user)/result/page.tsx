import { fetchCheckoutData, sendEmail } from "@/helpers/checkoutFunctions";
import { saveOrder } from "../orders/action";
import Link  from "next/link";
import { MovingBorder } from "@/components/ui/moving-border";

export async function generateMetadata() {
  return {
    title: "Purchase Successful | Zesty Merch",
    description: "Thanks for purchasing!",
  };
}

const CheckoutSuccess = async ({
  searchParams,
}: {
  searchParams: { [session_id: string]: string };
}) => {
  const response = await fetchCheckoutData(searchParams.session_id);

  if (response !== undefined && response.metadata) {
    await saveOrder(response);
    await sendEmail(response);
  }


  return (
    <section className="flex items-center justify-center h-screen">
      <div className=" p-2 bg-gradient-to-r rounded-lg from-pink-600 to-purple-600">
        <div className="bg-neutral-800 text-neutral-100 rounded-lg p-8 w-full max-w-3xl shadow-lg">
          <div className="flex flex-col gap-2">
            {response !== undefined &&
            response.metadata &&
            response.customer_details ? (
              <>
                <h1 className="mb-4 text-2xl font-extrabold text-gray-100 sm:text-3xl">
                  Transaction Details
                </h1>
                <h3 className="mb-3 text-lg font-semibold text-green-600 italic">
                  Successful payment
                </h3>
                <p className="mb-2 text-md text-neutral-300">
                  {`An email has been sent to you at: ${response.customer_details.email}`}
                </p>
                <Link href={'/cart'}>
                  <button className="px-5 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-900 duration-300 cursor-pointer">
                    Go back to cart
                  </button>
                </Link>
              </>
            ) : (
              <h1>An error has occurred.</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
