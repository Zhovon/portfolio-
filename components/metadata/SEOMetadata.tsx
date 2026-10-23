"use client"

import { useEffect } from 'react'

interface SEOMetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  type?: string
  url?: string
  image?: string
  locale?: string
}

/**
 * SEO Metadata Component for Zhovon Portfolio 2.0
 * Injects structured schema JSON-LD safely into the page
 */
export function SEOMetadata({ 
  title = 'ZHOVON | Lead SaaS Architect & Full-Stack Engineer',
  description = 'Shahadat Hossain (Zhovon) - Senior SaaS architect specializing in Next.js, React, TypeScript, and Payload CMS. Building high-performance digital experiences with 99+ Lighthouse scores.',
  keywords = ['saas', 'architect', 'portfolio', 'zhovon', 'nextjs', 'react', 'typescript'],
  type = 'website',
  url = process.env.NEXT_PUBLIC_URL || 'https://zhovon.com',
  image = '/social-preview.png',
  locale = 'en-US'
}: SEOMetadataProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title
    }
  }, [title])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shahadat Hossain",
    "alternateName": "Zhovon",
    "url": url,
    "email": "admin@zhovon.com",
    "jobTitle": "Lead SaaS Architect",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "71, Sayed Nagar, Dakshin Khan",
      "addressLocality": "Dhaka",
      "postalCode": "1230",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://github.com/Zhovon",
      "https://www.linkedin.com/in/shahadat-hossain-b314601b2/",
      "https://www.facebook.com/shahadathossai.shovon"
    ],
    "knowsAbout": [
      "React", "Next.js", "TypeScript", "SaaS Architecture", 
      "Full-Stack Development", "Payload CMS", "Node.js", "Three.js"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}