import type { Metadata } from "next";
import "./globals.css";
import { twMerge } from 'tailwind-merge';
import { RegionProvider } from "./providers/RegionProvider";
import FooterBar from './components/footer';
import { SiteHeader } from './components/header';
import { unifraktur, edwardian } from './fonts';

export const metadata: Metadata = {
  title: { default: 'h2bc', template: '%s | h2bc' },
  description: "culture | culture | culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(unifraktur.variable, edwardian.variable, 'antialiased min-h-screen flex flex-col items-center')}>
        <RegionProvider>
          <SiteHeader />
          <main className="flex-1 flex flex-col max-w-7xl w-full px-6 sm:px-8 md:px-10">
            {children}
          </main>
          <FooterBar />
        </RegionProvider>
      </body>
    </html>
  );
}
