import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { FavoritesProvider } from "@/components/Favorites";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastProvider } from "@/components/Toast";
import { getCategories } from "@/lib/api";

const display = Oswald({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = "Sporty is your live scores and sports hub: fixtures, league tables, local venues and match-day news in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Sporty - Live Scores & Sports Hub", template: "%s | Sporty" },
  description,
  keywords: ["sports", "live scores", "football", "basketball", "tennis", "sports events", "sports hub", "Phnom Penh"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Sporty", title: "Sporty - Live Scores & Sports Hub", description, url: "/" },
  twitter: { card: "summary_large_image", title: "Sporty - Live Scores & Sports Hub", description },
};
export const viewport: Viewport = { themeColor: "#0F0F11" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ToastProvider>
            <FavoritesProvider>
              <Header categories={categories} />
              <main>{children}</main>
              <Footer />
            </FavoritesProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
