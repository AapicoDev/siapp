// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProviderWrapper from "../components/ThemeProviderWrapper";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Kanit } from '@next/font/google';

// Configure Kanit font
const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Define the weights you want to use
  variable: '--font-kanit', // Optional: define a CSS variable
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIAPP Data management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${kanit.className} flex items-start justify-between`}>
          <Sidebar />
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
      </body>
    </html>
  );
}
