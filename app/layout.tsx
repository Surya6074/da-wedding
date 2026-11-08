import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MusicProvider } from "@/components/MusicContext";
import { InviteProvider } from "@/components/InviteContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import invitationData from "@/data/invitation.json";

export const viewport: Viewport = {
  themeColor: "#2D051B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://surya6074.github.io/da-wedding"),
  title: "Deivendran weds Akshaya, 22 Nov 2026",
  description: `We cordially invite you with family to celebrate the auspicious wedding ceremony of ${invitationData.groom.name} & ${invitationData.bride.name} on Sunday, 22nd November 2026 at Arulmigu Kuzhandhai Velappar Thirukkovil, Poombarai.`,
  keywords: [
    "Wedding Invitation",
    "Deivendran weds Akshaya",
    "Tamil Wedding",
    "Poombarai Wedding",
    "Kuzhandhai Velappar Temple",
    "South Indian Wedding",
  ],
  authors: [{ name: "Deivendran & Akshaya" }],
  openGraph: {
    title: "Deivendran weds Akshaya, 22 Nov 2026",
    description: `Join us in celebrating the holy matrimony of ${invitationData.groom.name} & ${invitationData.bride.name} on Sunday, 22nd November 2026 at Poombarai.`,
    type: "website",
    locale: "en_IN",
    siteName: "Deivendran & Akshaya Wedding Invitation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deivendran weds Akshaya, 22 Nov 2026",
    description: "Wedding digital invitation for M. Deivendran & P. Akshaya.",
  },
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FFF8E7] text-[#4A0E2E] antialiased selection:bg-[#B0125B] selection:text-[#FFF8E7]">
        <InviteProvider>
          <MusicProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </MusicProvider>
        </InviteProvider>
      </body>
    </html>
  );
}
