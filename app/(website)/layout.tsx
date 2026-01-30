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
    description: "Personal portfolio of Zhovon, a senior SaaS architect specializing in high-performance React, Next.js, and immersive digital experiences.",
    keywords: ["Zhovon", "SaaS Architect", "Full Stack Developer", "Next.js Expert", "React Developer", "Digital Portfolio"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Zhovon",
        "url": "https://zhovon.com",
        "jobTitle": "Lead SaaS Architect",
        "sameAs": [
            "https://github.com/zhovon",
            "https://twitter.com/zhovon",
            "https://linkedin.com/in/zhovon"
        ],
        "knowsAbout": ["React", "Next.js", "TypeScript", "SaaS Architecture", "Full-Stack Development"]
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
