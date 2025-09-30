import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import "./globals.css";
import { cn } from "@/lib/utils";
import { RegionProvider } from "./providers/RegionProvider";
import FooterBar from './components/footer';
import { SiteHeader } from './components/header';
import { unifraktur, edwardian } from './fonts';
import { sdk } from "@/lib/medusa";
import { getRegionCookie } from "./actions/regions";

export const metadata: Metadata = {
  title: { default: 'h2bc', template: '%s | h2bc' },
  description: "culture | culture | culture",
};

const getRegions = unstable_cache(
  async () => {
    try {
      const { regions } = await sdk.store.region.list();
      return regions.map(r => ({
        id: r.id,
        name: r.name,
        shortName: r.metadata?.shortName as string | undefined
      }));
    } catch (error) {
      console.error("Failed to fetch regions:", error);
      return [];
    }
  },
  ['regions'],
  { revalidate: 3600, tags: ['regions'] }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const regions = await getRegions();
  const regionId = await getRegionCookie();

  return (
    <html lang="en">
      <body className={cn(unifraktur.variable, edwardian.variable, "min-h-screen", "flex flex-col", "items-center")}>
        <RegionProvider regions={regions} initialRegionId={regionId!}>
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
