import "../globals.css";
import { Inter } from "next/font/google";
import Header from "../../components/Header";
import ThemeProviderWrapper from "../../components/ThemeProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "vCard Generator by Powermap",
  description: "Generate vCards with QR codes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProviderWrapper>
      <Header />
        <main className='flex-grow pb-16'>{children}</main>
    </ThemeProviderWrapper>
  );
}