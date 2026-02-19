import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beaj Ousama – Fullstack Software Engineer",
  description:
    "Fullstack Software Engineer with expertise in Next.js, React, Node.js, and modern web technologies. Building fast, scalable, and SEO-friendly applications.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/obeaj.svg?v=2", type: "image/svg+xml" },
      { url: "/obeaj.svg?v=2", type: "image/svg+xml", rel: "shortcut icon" },
    ],
    apple: "/obeaj.svg?v=2",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
