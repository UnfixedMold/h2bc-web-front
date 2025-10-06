import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from 'lucide-react';
import { NavLinks } from ".";
import BurgerMenu from "./burger-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RegionSelector from "./region-selector";
import { getRegions, getRegionCookie } from '@/lib/data/regions';
import ClientToastErrorHandler from '@/components/feedback/client-toast-error-handler';

const SHOP_LINKS = [
  { href: "/cart", label: "Cart", Icon: ShoppingBag },
];

export default async function SiteHeader() {
  const { regions, error } = await getRegions();
  const currentRegionId = await getRegionCookie();

  return (
    <ClientToastErrorHandler error={error}>
      <header className="relative z-50 w-full px-4 sm:px-8 md:px-12 lg:px-18 py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="grid grid-cols-3 items-center">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* mobile: burger + region selector */}
          <div className="md:hidden">
            <BurgerMenu />
          </div>

          <div className="md:hidden">
            <RegionSelector regions={regions} currentRegionId={currentRegionId} error={error} />
          </div>

          {/* desktop: logo on left */}
          <Link href="/" aria-label="Home" className="hidden md:inline-flex">
            <Image
              src="/bw-logo.svg"
              alt="h2bc"
              width={200}
              height={80}
              className="h-12 md:h-18 w-auto"
              priority
            />
          </Link>
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center">
          {/* mobile: logo centered */}
          <Link href="/" aria-label="Home" className="md:hidden inline-flex">
            <Image
              src="/bw-logo.svg"
              alt="h2bc"
              width={200}
              height={80}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* desktop: nav links centered */}
          <nav aria-label="Primary" className="hidden md:flex items-center justify-center flex-1">
            <NavLinks
              ulClassName="flex items-center gap-5 lg:gap-12 text-2xl leading-none tracking-wide"
            />
          </nav>
        </div>

        {/* RIGHT */}
        <nav aria-label="Shop" className="flex items-center justify-end gap-2">
          {/* desktop: region dropdown on right */}
          <div className="hidden md:block">
            <RegionSelector regions={regions} currentRegionId={currentRegionId} error={error} />
          </div>
          {SHOP_LINKS.map(({ href, label, Icon }) => (
            <Button key={href} variant="ghost" className="relative">
              <Link href={href!} aria-label={label}>
                <Icon />
              </Link>
              {label === "Cart" && (
                <Badge className="absolute top-1 right-2 h-4 w-4 flex items-center justify-center p-0 text-white bg-pink-500 text-[10px] pointer-events-none">
                  3
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>
    </header>
    </ClientToastErrorHandler>
  );
}
