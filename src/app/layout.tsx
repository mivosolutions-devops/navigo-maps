import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: "NaviGO Maps",
  description:
    "NaviGO Maps - Get directions, explore locations, and plan your journey",
  icons: {
    icon: "/favicon.ico"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
