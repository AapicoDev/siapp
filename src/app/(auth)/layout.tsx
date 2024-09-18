import "../globals.css";
import { Inter } from "next/font/google";
import ThemeProviderWrapper from "../../components/ThemeProviderWrapper";
import PageWrapper from "@/components/pagewrapper";

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
      <main className="grid w-full h-full" >
        <PageWrapper>
          {children}
        </PageWrapper>
      </main>
    // </ThemeProviderWrapper>
  );
}