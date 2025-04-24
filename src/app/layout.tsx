import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "5x5",
  description: "Art meets innovation",
  metadataBase: new URL(process.env.siteUrl || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark !bg-black">
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} !bg-black !text-white min-h-[100dvh] m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}
