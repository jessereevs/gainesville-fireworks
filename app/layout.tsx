import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gainesville Fireworks",
  description: "Fireworks for sale in Gainesville, Florida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
