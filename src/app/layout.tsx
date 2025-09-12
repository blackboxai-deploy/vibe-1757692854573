import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DyslexiaEdu Pro - Professional Learning Platform",
  description: "Advanced dyslexia education platform with interactive learning tools, assessments, and progress tracking.",
  keywords: "dyslexia, education, learning, assessment, special needs, reading, writing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}