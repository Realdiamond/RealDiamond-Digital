import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RealDiamond Digital | Strategic Web Design & Development That Grows Revenue",
  description: "We build high-performance websites that increase revenue by 3x. Expert web design, development, SEO, and digital marketing for growing businesses. Trusted by 50+ companies.",
  keywords: ["web design", "web development", "SEO", "digital marketing", "Next.js", "custom websites", "ecommerce", "SaaS marketing"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "RealDiamond Digital | Strategic Web Design & Development",
    description: "We build high-performance websites that increase revenue by 3x. Expert web design, development, SEO, and digital marketing for growing businesses.",
    type: "website",
    locale: "en_US",
    siteName: "RealDiamond Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "RealDiamond Digital | Strategic Web Design & Development",
    description: "We build high-performance websites that increase revenue by 3x. Trusted by 50+ businesses to deliver measurable growth.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
