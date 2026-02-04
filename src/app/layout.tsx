import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SafariOptimizations } from '@/components/ui/SafariOptimizations';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: '%s | Sumire',
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: 'Sumire' }],
  creator: 'Sumire',
  publisher: 'Sumire',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: 'https://sumire.com',
    siteName: 'Sumire',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Preconnect to CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <SafariOptimizations />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
