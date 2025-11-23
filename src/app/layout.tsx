import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "@/components/providers/supabase-provider";
import { ModeProvider } from "@/components/providers/mode-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConditionalBottomNav } from "@/components/navigation/conditional-bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahaz - Neo-Bank Super App",
  description: "A self-contained digital economy simulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SupabaseProvider>
          <ModeProvider>
            <ThemeProvider>
              {children}
              <ConditionalBottomNav />
            </ThemeProvider>
          </ModeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
