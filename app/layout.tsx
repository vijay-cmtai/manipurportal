import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // यह इम्पोर्ट सही है
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"; // Toaster को यहाँ इम्पोर्ट करें

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal Employment & Income Empowerment Platform",
  description: "Empower your income, grow your digital presence",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
