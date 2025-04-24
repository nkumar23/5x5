import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "5x5",
  description: "Art meets innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-black">
      <body className={`${inter.className} min-h-[100dvh] bg-black text-white m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}
