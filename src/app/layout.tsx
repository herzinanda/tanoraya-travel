import type { Metadata } from "next";
import { Dancing_Script, Geist, Manrope } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Tanoraya Travel",
    template: "%s | Tanoraya Travel",
  },
  description:
    "Explore the world with Tanoraya Travel — your gateway to unforgettable journeys across Indonesia and Southeast Asia.",
  openGraph: {
    siteName: "Tanoraya Travel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<body
        className={`${geist.variable} ${manrope.variable} ${dancingScript.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
