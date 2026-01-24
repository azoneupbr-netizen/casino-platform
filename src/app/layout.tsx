import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBanner from "@/components/layout/TopBanner";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/layout/BottomNavigation";
import ChatButton from "@/components/layout/ChatButton";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allyk Casino",
  description: "A melhor plataforma de apostas esportivas e cassino online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary text-text-primary transition-colors duration-300`}
      >
        <ThemeProvider>
          <TopBanner />
          <Header />
          <div className="flex min-h-[calc(100vh-5rem)] relative">
            <Sidebar />
            <main className="flex-1 min-w-0 transition-all duration-300 flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </main>
          </div>
          <BottomNavigation />
          <ChatButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
