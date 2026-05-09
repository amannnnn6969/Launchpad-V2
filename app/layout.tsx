import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";

export const metadata: Metadata = {
  title: "Launchpad — Custom Web Experiences",
  description: "Custom-coded in Next.js. Cinematic in motion. Built for brands that refuse to blend in.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <MagneticCursor magneticFactor={0.55} cursorSize={40} blendMode="exclusion">
            {children}
          </MagneticCursor>
        </ThemeProvider>
      </body>
    </html>
  );
}
