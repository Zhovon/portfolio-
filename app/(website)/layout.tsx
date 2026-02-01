import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StarsCanvas from "@/components/StarBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NexusNav } from "@/components/NexusNav";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ZHOVON | Lead SaaS Architect & Full-Stack Engineer",
    description: "Shahadat Hossain (Zhovon) - Senior SaaS architect specializing in Next.js, React, TypeScript, and Payload CMS. Building high-performance digital experiences with 99+ Lighthouse scores.",
    keywords: ["Zhovon", "Shahadat Hossain", "SaaS Architect", "Full Stack Developer", "Next.js Expert", "React Developer", "TypeScript Pro", "Payload CMS", "Web Development", "Dhaka Bangladesh"],
    authors: [{ name: "Shahadat Hossain (Zhovon)", url: "https://zhovon.com" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://zhovon.com",
        title: "ZHOVON | Lead SaaS Architect & Full-Stack Engineer",
        description: "Senior SaaS architect specializing in Next.js, React, TypeScript, and Payload CMS. Building high-performance digital experiences.",
        siteName: "Zhovon Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "ZHOVON | Lead SaaS Architect & Full-Stack Engineer",
        description: "Senior SaaS architect specializing in Next.js, React, TypeScript, and Payload CMS.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Shahadat Hossain",
        "alternateName": "Zhovon",
        "url": "https://zhovon.com",
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
        "knowsAbout": ["React", "Next.js", "TypeScript", "SaaS Architecture", "Full-Stack Development", "Payload CMS", "Node.js", "Three.js"]
    }

    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
                <SmoothScroll>
                    <StarsCanvas />
                    <NexusNav />
                    <div className="relative z-10 w-full min-h-screen">
                        {children}
                    </div>
                </SmoothScroll>
            </body>
        </html>
    );
}
