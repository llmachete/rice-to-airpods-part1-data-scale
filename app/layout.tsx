import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import "./globals.css";
import CookieBanner from '@/components/shared/CookieBanner';

// Brand-compliant fonts per LLMachete Brand Bible
// Primary: Inter for UI/headings (web alternative to TeX Gyre Adventor)
// Body: Georgia serif for long-form content (system font)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "From Rice to AirPods: Data Scale | LLMachete",
  description: "Understanding data scale from kilobytes to zettabytes through a single grain of rice. Explore humanity's transformation from Industrial Revolution to Information Age.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}

        {/* Vercel Analytics */}
        <Analytics />

        {/* Cookie Consent Banner */}
        <CookieBanner />
      </body>
    </html>
  );
}
