import type { Metadata } from "next";
import { Cardo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ConditionalNav from "@/components/layout/ConditionalNav";


// ── Google Fonts ─────────────────────────────────────────────────────────────

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Ares Drive",
  description: "Cinematic velocity — premium driving experience",
};

// ── Root layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cardo.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ConditionalNav>{children}</ConditionalNav>
      </body>
    </html>
  );
}
