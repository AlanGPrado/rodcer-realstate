import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import WhatsAppFAB from "./components/WhatsAppFAB";
import { LanguageProvider } from "./lib/i18n/LanguageContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "RodcerState - Real Estate Group",
  description: "Find your dream property with RodcerState Real Estate Group. Professional real estate services for buying, selling, and renting properties.",
  keywords: "real estate, properties, homes, apartments, land, buy, sell, rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <WhatsAppFAB />
        </LanguageProvider>
      </body>
    </html>
  );
}
