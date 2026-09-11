import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { getCategories } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UNFOLD — Wear Your Perspective | Graphic Printed Streetwear",
  description:
    "UNFOLD is a premium graphic printed T-shirt brand engineered on 240 GSM heavy combed cotton. Discover Street/Urban, Art/Creative, Statement/Attitude, and Vintage/Culture collections.",
  keywords: [
    "streetwear",
    "graphic t-shirts",
    "oversized tees",
    "240 GSM cotton",
    "UNFOLD",
    "perspective clothing",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve categories from database layer (with resilient fallback)
  const categories = await getCategories();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('unfold_theme');
                  var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
                  document.documentElement.classList.remove('dark', 'light');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-accent-volt selection:text-black antialiased">
        <ThemeProvider>
          <CartProvider>
            <ThemeSwitcher />
            <AnnouncementBar />
            <Navbar categories={categories} />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
