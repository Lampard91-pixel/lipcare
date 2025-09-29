import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/app/contexts/CartContext";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Poppins,
} from "next/font/google";


// @ts-expect-error - Required for global CSS imports in TypeScript
import "./globals.css";
import LayoutFrame from "@/components/LayoutFrame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LipCrush",
  description: "Lipscare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${poppins.variable} antialiased`}
          >
            <LayoutFrame>{children}</LayoutFrame>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
