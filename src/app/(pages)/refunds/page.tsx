import RefundComponent from '@/components/ui/refund'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Refunds | Zesty Merch",
  description:
    "Refunds and Return information for your products.",
};
const Refunds = () => {
  return (
    <RefundComponent />
  )
}

export default Refunds