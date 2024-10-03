import "../globals.css";
import { Inter } from "next/font/google";
import ThemeProviderWrapper from "../../components/ThemeProviderWrapper";
import PageWrapper from "@/components/pagewrapper";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIAPP Data Management",
  description: "SIAPP Data Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ThemeProviderWrapper>
    <main className="flex w-full h-[1280] overflow-hidden">
      <Sidebar />
      <PageWrapper>
        {children}
      </PageWrapper>
    </main>
    // </ThemeProviderWrapper>
  );
}