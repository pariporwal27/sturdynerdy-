import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "SturdyNerdy — Turn lecture chaos into study clarity.",
  description:
    "SturdyNerdy is a calm, modern study workspace that helps university students transform cluttered lecture slides, syllabi, and notes into clear, structured understanding.",
  keywords: [
    "SturdyNerdy",
    "digital study desk",
    "study workspace",
    "lecture notes organizer",
    "one glance summary",
    "revision notes",
    "academic exam prep",
    "PDF DOCX PPTX synthesizer",
  ],
  authors: [{ name: "SturdyNerdy Team" }],
  openGraph: {
    title: "SturdyNerdy — Turn lecture chaos into study clarity.",
    description:
      "A calm digital study desk that transforms cluttered study materials into structured notes.",
    siteName: "SturdyNerdy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SturdyNerdy — Turn lecture chaos into study clarity.",
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
    <html lang="en" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <body className="font-sans min-h-screen bg-[#FAF8F3] text-[#162130] selection:bg-[#EAEFF7] selection:text-[#1B2A47] antialiased">
        {children}
      </body>
    </html>
  );
}
