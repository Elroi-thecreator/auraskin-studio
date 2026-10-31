import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuraSkin Studio — YouCam AI Skin Diagnostic & Look VTO Platform',
  description: 'The unified clinical skin diagnostic and interactive eCommerce Virtual Try-On platform powered by Perfect Corp YouCam APIs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-rose-500/30 selection:text-rose-200">
        {children}
      </body>
    </html>
  );
}
