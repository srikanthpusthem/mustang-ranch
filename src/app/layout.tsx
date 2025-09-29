import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AgentProvider } from "@/components/AgentProvider";
import { AgentDock } from "@/components/AgentDock";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mustang Ranch - Western Investment Platform",
  description: "Invest in iconic American Mustangs, barndominium ranch houses, and community programs. AI agents guide you like ranch hands.",
  keywords: ["investment", "mustangs", "barndominium", "community gardens", "western", "ranch"],
  authors: [{ name: "Mustang Ranch" }],
  openGraph: {
    title: "Mustang Ranch - Western Investment Platform",
    description: "Invest in iconic American Mustangs, barndominium ranch houses, and community programs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustang Ranch - Western Investment Platform",
    description: "Invest in iconic American Mustangs, barndominium ranch houses, and community programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} antialiased grain-overlay`}
      >
        <AgentProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="relative flex-1">
              {children}
            </main>
            <Footer />
            <AgentDock />
          </div>
        </AgentProvider>
      </body>
    </html>
  );
}
