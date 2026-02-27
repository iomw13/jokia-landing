import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JOKIA | Agencia Digital en Córdoba - Automatización con IA",
  description:
    "Agencia digital en Córdoba, Argentina. Branding, marketing digital, landing pages y automatización con IA. +50 proyectos exitosos.",
  keywords:
    "agencia digital córdoba, branding argentina, marketing digital, automatización IA, landing pages, jokia",
  authors: [{ name: "JOKIA" }],
  openGraph: {
    title: "JOKIA | Agencia Digital Premium",
    description: "Diseñamos futuros digitales con IA y automatización",
    url: "https://jokia.agency",
    siteName: "JOKIA",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOKIA | Agencia Digital Premium",
    description: "Diseñamos futuros digitales con IA y automatización",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
