// @ts-nocheck 

"use client";

import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormState, useFormStatus } from "react-dom";
import { handleContactForm } from "@/app/actions";
import { Tooltip } from "../ui/people";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Spotlight } from "../ui/spotlight";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  details: string;
  purpose: string;
  orderId?: string;
};

export const ContactHero = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<FormValues>();

  const selectedPurpose = watch("purpose");

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const response = await handleContactForm(formData);
      toast({
        title: "Form Submitted Successfully!",
        description: format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a"),
      });
      resetForm();
    } catch (error) {
      console.error("Failed to submit form:", error);
      toast({
        title: "Form Submission Failed!",
        description: format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a"),
      });
    }
  };

  const resetForm = () => {
    reset();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      <Spotlight className="-top-40 left-0 w-screen md:-top-20" fill="white" />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-grid-white/5 bg-black">
        <div className="max-w-2xl lg:max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Contact us
            </h1>
            <p className="mt-1 text-neutral-400">
              We&apos;d love to talk about how we can help you.
            </p>
          </div>

          <div className="mt-12 grid items-center rounded-lg bg-neutral-900 lg:grid-cols-2 gap-6 lg:gap-16">
            <div className="flex flex-col border-l rounded-lg p-4 sm:p-6 lg:p-8 border-neutral-700">
              <h2 className="mb-8 text-xl font-semibold text-neutral-200">
                Fill in the form
              </h2>

              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="sr-only">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName", { required: true })}
                        className="py-3 px-4 block w-full border border-neutral-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-neutral-900 text-neutral-400 placeholder-neutral-500"
                        placeholder="First Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="sr-only">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName", { required: true })}
                        className="py-3 px-4 block w-full border border-neutral-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-neutral-900 text-neutral-400 placeholder-neutral-500"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: true })}
                      className="py-3 px-4 block border border-neutral-700 w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-neutral-900 text-neutral-400 placeholder-neutral-500"
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      {...register("phoneNumber")}
                      className="py-3 px-4 block w-full border border-neutral-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-neutral-900 text-neutral-400 placeholder-neutral-500"
                      placeholder="Phone Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="purpose" className="sr-only">
                      What is this for?
                    </label>
                    <select
                      id="purpose"
                      {...register("purpose", { required: true })}
                      className="py-3 px-4 block w-full border border-neutral-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-neutral-900 text-neutral-400 placeholder-neutral-500"
                    >
                      <option value="contact">Just Contacting</option>
                      <option value="technical">Technical Issues</option>
                      <option value="orders">Orders</option>
                      <option value="designBattles">Design Battles</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  {selectedPurpose === "orders" && (
                    <div>
                      <label htmlFor="orderId" className="sr-only">
                        Order ID
                      </label>
                      <input
                        type="text"
                        id="orderId"
                        {...register("orderId", { required: true })}
                        className="py-3 px-4 block w-full border border-neutral-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-neutral-900 text-neutral-400 placeholder-neutral-500"
                        placeholder="Order ID"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="details" className="sr-only">
                      Details
                    </label>
                    <textarea
                      id="details"
                      {...register("details", { required: true })}
                      rows={4}
                      className="py-3 px-4 block w-full border border-neutral-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-neutral-900 text-neutral-400 placeholder-neutral-500"
                      placeholder="Details"
                    />
                  </div>
                </div>

                <div className="mt-4 grid">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent  focus:outline-none bg-neutral-700 hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isSubmitting || !isDirty}
                  >
                    {isSubmitting ? "Sending..." : "Send inquiry"}
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm text-neutral-500">
                    We&apos;ll get back to you in 1-2 business days.
                  </p>
                </div>
              </form>
            </div>

            <div className="divide-y items-center divide-neutral-800">
              <Tooltip />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
