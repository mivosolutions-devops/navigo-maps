import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "../../providers/StoreProvider";
import SessionProvider from "@/providers/SessionProvider";
import Sidebar from "@/components/sidebar";
import Nav from "@/components/nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import RQProvider from "@/providers/rq-provider";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-readex-pro",
});

export const metadata: Metadata = {
  title: "TransitTracker - NaviGO",
  description: "NaviGO transit tracker management portal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg" />
      </head>
      <body
        className={cn(
          "w-full min-h-screen bg-background antialiased font-sans",
          `${readexPro.variable} font-readex`,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StoreProvider>
            <SessionProvider>
              <RQProvider>
                <main className="w-full h-full min-h-screen overflow-y-hidden flex">
                  <Sidebar />
                  <div className="w-[85%] h-full">
                    <Nav />
                    <ScrollArea className="h-[90vh]">{children}</ScrollArea>
                  </div>
                </main>
              </RQProvider>
            </SessionProvider>
          </StoreProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
