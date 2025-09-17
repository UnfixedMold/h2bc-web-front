"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavMenu, ShopLinks } from ".";
import { unifrakturMaguntia } from "../../fonts";

export default function SiteHeader() {
  
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="relative z-50 w-full px-4 sm:px-8 md:px-12 lg:px-18 py-6 sm:py-8 md:py-10 lg:py-12 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3 md:gap-5 lg:gap-8">
      <nav aria-label="Primary" className="justify-self-start min-w-0">
        <NavMenu
          activePath={pathname}
          ulClassName="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-12 text-xl sm:text-2xl tracking-wide"
          linkClassName={`${unifrakturMaguntia.className} hover-glow-pink rounded-md transition-colors`}
          activeLinkClassName="text-pink-400"
        />
      </nav>

      <Link href="/" aria-label="Home" className="justify-self-center">
        <img src="/bw-logo.svg" alt="h2bc" className="h-14 sm:h-16 md:h-20 w-auto" />
      </Link>

      <nav aria-label="Shop" className="justify-self-end min-w-0">
        <ShopLinks />
      </nav>
    </header>
  );
}
