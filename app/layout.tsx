import type { Metadata } from "next";
import "./globals.css";
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
      <body className={`${unifraktur.variable} ${edwardian.variable} antialiased min-h-screen flex flex-col`}>
        <RegionProvider>
          <SiteHeader />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <FooterBar />
        </RegionProvider>
      </body>
    </html>
  );
}
