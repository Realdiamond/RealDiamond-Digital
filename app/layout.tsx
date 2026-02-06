import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { generateSEO } from "@/lib/seo";
import { generateOrganizationSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateSEO();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema({
    name: "RealDiamond Digital",
    url: "https://realdiamondworks.com",
    logo: "https://realdiamondworks.com/logo.png",
    description: "Strategic web design, development, SEO, and digital marketing agency",
    email: "akinsanmioluwatimilehin@gmail.com",
    telephone: "+1-XXX-XXX-XXXX",
    address: {
      streetAddress: "Your Street Address",
      addressLocality: "Your City",
      addressRegion: "Your State",
      postalCode: "Your ZIP",
      addressCountry: "US",
    },
    sameAs: [
      "https://twitter.com/realdiamonddigital",
      "https://linkedin.com/company/realdiamonddigital",
      "https://instagram.com/realdiamonddigital",
    ],
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
