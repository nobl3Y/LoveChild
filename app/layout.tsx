import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NatalRecall | Sovereign Antenatal Clinical Memory Scribe',
  description: 'AI Maternal Health Scribe that preserves longitudinal pregnancy symptoms across 40 weeks into verifiable, decentralized Walrus Memory on Sui.',
  keywords: ['Walrus Protocol', 'Walrus Memory', 'Antenatal Care', 'Maternal Health', 'AI Scribe', 'Sui Blockchain', 'Gemini AI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🩺</text></svg>" />
      </head>
      <body className="antialiased selection:bg-rose-100 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
