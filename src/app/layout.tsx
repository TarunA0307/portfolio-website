import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarun Anantha Kumar — AI & Data Science Portfolio",
  description:
    "Portfolio of Tarun Anantha Kumar, an AI & Data Science student passionate about architecting intelligent systems and modern software.",
  keywords: [
    "Tarun Anantha Kumar",
    "AI",
    "Data Science",
    "Portfolio",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: "Tarun Anantha Kumar" }],
  openGraph: {
    title: "Tarun Anantha Kumar — AI & Data Science Portfolio",
    description:
      "Architecting Intelligence. AI & Data Science student building smart systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05030A] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
