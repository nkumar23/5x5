import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from '../components/layout/Navbar';

const inter = Inter({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'] });

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
      <body className={`${inter.className} ${bricolage.className} !bg-black !text-white min-h-[100dvh] m-0 p-0`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
