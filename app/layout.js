import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Social Profiles App',
  description: 'A Next.js app with Firebase auth and shareable profiles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Navigation />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}



/* import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Globix",
  description: "Build For The Change!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
 */