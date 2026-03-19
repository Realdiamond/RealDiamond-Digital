import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { generateSEO } from "@/lib/seo";
import { generateOrganizationSchema } from "@/lib/schema";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateSEO();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  const organizationSchema = generateOrganizationSchema({
    name: "RealDiamond Digital",
    url: "https://realdiamonddigital.studio",
    logo: "https://realdiamonddigital.studio/icons/logo.png",
    description: "Strategic web design, development, SEO, and digital marketing agency",
    email: "realdiamonddigital@gmail.com",
    telephone: "+2348138462476",
    areaServed: "Worldwide",
    sameAs: [
      "https://www.linkedin.com/in/oluwatimilehin0-akinsanmi1/",
      "https://x.com/Iam_RealDiamond/",
    ],
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {googleSiteVerification ? (
          <meta
            name="google-site-verification"
            content={googleSiteVerification}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
