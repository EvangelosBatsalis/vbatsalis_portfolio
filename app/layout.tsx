import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // Global styles

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Evangelos Batsalis | Systems Administrator & DevOps",
  description:
    "Portfolio & Digital Workspace of Evangelos Batsalis. I design, harden, and automate IT infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body
        className="bg-[#050505] text-gray-200 font-sans antialiased selection:bg-yellow-500/30 selection:text-yellow-200"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
