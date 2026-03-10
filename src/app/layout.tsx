import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'For You ❤️',
  description: 'A romantic mobile experience',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

import DesktopWarning from '@/components/DesktopWarning';
import BubblesBackground from '@/components/BubblesBackground';
import AudioPlayer from '@/components/AudioPlayer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} id="app-content">
        <DesktopWarning />
        <BubblesBackground />
        <AudioPlayer />
        
        <div className="w-full max-w-md mx-auto px-6 sm:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
