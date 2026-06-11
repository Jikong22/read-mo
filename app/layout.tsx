import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Read:Mo — 수능 영어 교양 매거진",
  description: "딱딱한 모의고사 지문을 세련된 웹진으로 읽어보세요",
  openGraph: {
    title: "Read:Mo — 수능 영어 교양 매거진",
    description: "딱딱한 모의고사 지문을 세련된 웹진으로 읽어보세요",
    type: "website",
    siteName: "Read:Mo",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Read:Mo — 수능 영어 교양 매거진",
    description: "딱딱한 모의고사 지문을 세련된 웹진으로 읽어보세요",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["수능", "모의고사", "영어", "지문", "교양", "매거진", "웹진"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Read:Mo",
              description: "딱딱한 모의고사 지문을 세련된 웹진으로 읽어보세요",
              url: "https://read-mo.vercel.app",
            }),
          }}
        />
        <Nav />
        {children}
      </body>
    </html>
  );
}
