import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://testaran.site"),

  title: {
    default: "Testaran — AI թեստերի գեներատոր PDF ֆայլերից",
    template: "%s | Testaran",
  },

  description:
    "Testaran-ը AI թեստերի գեներատոր է ուսուցիչների համար։ Վերբեռնեք PDF դասանյութ և ստացեք պատրաստի հարցաշարեր՝ ճիշտ պատասխաններով, տարբերակներով և բացատրություններով։",

  keywords: [
    "Testaran",
    "AI թեստերի գեներատոր",
    "թեստերի գեներատոր",
    "PDF-ից թեստ ստեղծել",
    "PDF quiz generator",
    "AI Quiz Generator",
    "quiz generator for teachers",
    "հարցաշարերի գեներատոր",
    "ուսուցիչների համար թեստեր",
    "առցանց թեստեր",
    "հայերեն թեստեր",
    "Armenian quiz generator",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Testaran — AI թեստերի գեներատոր PDF ֆայլերից",
    description:
      "Վերբեռնեք PDF դասանյութ և ստացեք պատրաստի թեստեր AI-ի օգնությամբ՝ ճիշտ պատասխաններով և բացատրություններով։",
    url: "https://testaran.site",
    siteName: "Testaran",
    locale: "hy_AM",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Testaran AI թեստերի գեներատոր",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Testaran — AI թեստերի գեներատոր PDF ֆայլերից",
    description:
      "PDF դասանյութից ստեղծեք պատրաստի թեստեր AI-ի օգնությամբ։",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hy"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}