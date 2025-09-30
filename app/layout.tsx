import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { RegionProvider } from "./providers/RegionProvider";
import FooterBar from './components/footer';
import { SiteHeader } from './components/header';
import { unifraktur, edwardian } from './fonts';
import { getRegionCookie, getRegions } from "./actions/regions";

export const metadata: Metadata = {
  title: { default: 'h2bc', template: '%s | h2bc' },
  description: "culture | culture | culture",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { regions, error } = await getRegions();
  const regionId = await getRegionCookie();

  return (
    <html lang="en">
      <body className={cn(unifraktur.variable, edwardian.variable, "min-h-screen", "flex flex-col", "items-center")}>
        <Toaster position="top-center" richColors />
        <RegionProvider regions={regions} initialRegionId={regionId!} error={error}>
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
