import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "JOKIA | Agencia Digital en Córdoba - Automatización con IA",
  description:
    "Agencia digital en Córdoba, Argentina. Branding, marketing digital, landing pages y automatización con IA. +50 proyectos exitosos.",
  keywords:
    "agencia digital córdoba, branding argentina, marketing digital, automatización IA, landing pages, jokia",
  authors: [{ name: "JOKIA" }],
  verification: {
    google: "5MiorMKCv0heH_Y64cRzxJ6WaaiBkBDADgzSqSp2Ozg",
  },
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
      className={`${inter.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WQ90V15W50"
          strategy="beforeInteractive"
        />
        <Script
          id="gtag-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WQ90V15W50');
            `,
          }}
        />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
