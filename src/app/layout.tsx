import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "SturdyNerdy — From lecture chaos to study clarity",
  description:
    "SturdyNerdy is a calm, modern study workspace that helps students transform cluttered study materials into clear, structured understanding.",
  keywords: [
    "SturdyNerdy",
    "study workspace",
    "lecture notes organizer",
    "one glance summary",
    "revision notes",
    "academic exam prep",
    "PDF DOCX PPTX synthesizer",
  ],
  authors: [{ name: "SturdyNerdy Team" }],
  openGraph: {
    title: "SturdyNerdy — From lecture chaos to study clarity",
    description:
      "A calm study workspace that turns cluttered study materials into clear, structured notes.",
    siteName: "SturdyNerdy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SturdyNerdy — From lecture chaos to study clarity",
    description:
      "Transform cluttered lecture slides, syllabi, and notes into structured understanding.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans min-h-screen bg-[#FBF9F4] text-[#1A232E] selection:bg-[#EAEFF7] selection:text-[#1B2A47]">
        {children}
      </body>
    </html>
  );
}
