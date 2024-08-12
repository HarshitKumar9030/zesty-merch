import { AboutComponent } from '@/components/about/AboutComponent'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "About | Zesty Merch",
    description: "About Page for Zesty Merch"   
}

export default function About() {
    return (
        <>
            <AboutComponent />
        </>
    )
}