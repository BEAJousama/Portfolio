import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://obeaj.com"
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ousama Beaj | Frontend Engineer | Obeaj",
    template: "%s | Ousama Beaj",
  },
  description:
    "Ousama Beaj (Obeaj) – Frontend Engineer from Khouribga, Morocco. Expert in Next.js, React, TypeScript, Node.js, and Sanity CMS. Building fast, SEO-friendly web applications. Freelance available.",
  keywords: [
    "Ousama Beaj",
    "Oussama Beaj",
    "Beaj Ousama",
    "Beaj Oussama",
    "Obeaj",
    "Frontend Engineer",
    "Fullstack Developer",
    "React Developer",
    "Next.js Developer",
    "Khouribga",
    "Morocco",
    "Web Developer Morocco",
    "Freelance Developer",
    "Sanity CMS",
    "TypeScript",
  ],
  authors: [{ name: "Ousama Beaj", url: baseUrl }],
  creator: "Ousama Beaj",
  publisher: "Ousama Beaj",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: baseUrl,
    siteName: "Ousama Beaj Portfolio",
    title: "Ousama Beaj | Frontend Engineer | Obeaj",
    description:
      "Frontend Engineer from Khouribga, Morocco. Expert in Next.js, React, TypeScript, Node.js, and Sanity CMS. Building fast, SEO-friendly web applications.",
    images: [
      {
        url: "/obeaj.svg",
        width: 1200,
        height: 630,
        alt: "Ousama Beaj - Frontend Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ousama Beaj | Frontend Engineer | Obeaj",
    description:
      "Frontend Engineer from Khouribga, Morocco. Expert in Next.js, React, TypeScript, and modern web technologies.",
    creator: "@oussama_beaj",
    site: "@oussama_beaj",
    images: ["/obeaj.svg"],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      en: baseUrl,
      fr: `${baseUrl}/fr`,
    },
  },
  category: "technology",
  classification: "Portfolio, Developer, Engineer",
  ...(googleSiteVerification && {
    verification: {
      google: googleSiteVerification,
    },
  }),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  )
}
