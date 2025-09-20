"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks, ShopLinks } from ".";
import BurgerMenu from "./NavMenu/BurgerMenu";

export default function SiteHeader() {

  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="relative z-50 w-full px-4 sm:px-8 md:px-12 lg:px-18 py-6 sm:py-8 md:py-10 lg:py-12 grid grid-cols-[1fr_auto_1fr] items-center">
      <div className="col-start-1 flex items-center gap-3 min-w-0">
        <BurgerMenu
          activePath={pathname}
          linkClassName="hover-glow-pink rounded-md transition-colors leading-none align-middle"
          mobileUlClassName="flex flex-col items-stretch py-2"
        />
      </div>

      <Link href="/" aria-label="Home" className="col-start-2 md:col-start-1 justify-self-center md:justify-self-start">
        <img src="/bw-logo.svg" alt="h2bc" className="h-14 sm:h-16 md:h-20 w-auto" />
      </Link>

      <nav aria-label="Primary" className="col-start-2 hidden md:flex items-center justify-center">
        <NavLinks
          activePath={pathname}
          ulClassName="flex items-center gap-5 lg:gap-12 text-2xl leading-none tracking-wide"
          linkClassName="hover-glow-pink rounded-md transition-colors leading-none align-middle"
        />
      </nav>

      <nav aria-label="Shop" className="col-start-3 flex items-center min-w-0 justify-self-end">
        <ShopLinks />
      </nav>
    </header>
  );
}
