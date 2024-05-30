import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { CartProvider } from './ui/CartContext';

export const metadata: Metadata = {
  title: 'Gainesville Fireworks',
  description: 'Fireworks for sale in Gainesville, Florida.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
