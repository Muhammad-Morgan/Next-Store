import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Meta data and Font importing
import "./globals.css";
// CSS
import Providers from "./Providers";
// Main Provider (that contains all providers)
import { Container } from "@/components/global/Container";
// Main container to align all items
import Navbar from "@/components/nav/Navbar";
// Importing whatever component will be shown in all the pages
const inter = Inter({ subsets: ["latin"] });
// Setting Font
export const metadata: Metadata = {
  title: "Next Store",
  description: "A nifty store built with Next.js",
};
// Setting title and meta data
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Container className="py-20">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
