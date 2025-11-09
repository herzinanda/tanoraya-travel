import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Dancing_Script, Manrope } from "next/font/google";
import './globals.css';

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
  title: "Tanoraya Travel",
  description: "Explore the world with Tanoraya Travel - Your gateway to unforgettable journeys and adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dancingScript.variable} bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
