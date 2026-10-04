import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NatalRecall | Maternal Care Journal & Clinic Summary',
  description: 'A maternal care chatbot for women that keeps a record of every detail you share over time, turning it into a clear report for doctor visits so nothing gets missed.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23be123c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/></svg>"
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-800 selection:bg-rose-100 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
