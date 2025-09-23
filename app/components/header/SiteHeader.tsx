"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";

import { NavLinks } from ".";
import { BurgerMenuPanel, BurgerMenuProvider, BurgerMenuTrigger } from "./BurgerMenu";
import Dropdown from "../ui/inputs/Dropdown";
import ImageButton from "@/app/components/ui/buttons/ImageButton";

const REGION_OPTIONS = [
  { value: "lt", label: "EUR € | Lithuania", shortLabel: "€ LT" },
  { value: "eu", label: "EUR € | Rest of Europe", shortLabel: "€ EU" },
];

const SHOP_LINKS = [
  { href: "/profile", label: "Profile", Icon: FiUser },
  { href: "/cart", label: "Cart", Icon: FiShoppingCart },
];

const SHOP_ICON_SIZE = 25;

export default function SiteHeader() {
  const pathname = usePathname();
  const [region, setRegion] = useState("lt");

  const getDisplayLabel = useCallback(
    (opt?: { value?: string }) =>
      opt?.value
        ? REGION_OPTIONS.find(o => o.value === opt.value)?.shortLabel ?? ""
        : "",
    []
  );

  if (pathname === "/") return null;

  const regionDropdownConfig = {
    options: REGION_OPTIONS,
    value: region,
    onChange: setRegion,
    getDisplayLabel,
    variant: "secondary" as const,
    inputClassName: "h-[29px] min-w-[60px]",
    labelClassName: "text-sm font-bold",
    arrowSize: 25,
    itemClassName: "px-4 py-3 min-w-[200px] text-xs",
  };

  return (
    <header className="relative z-50 w-full px-4 sm:px-8 md:px-12 lg:px-18 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* 3-part grid always */}
      <div className="grid grid-cols-3 items-center">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* mobile: burger + region */}
          <BurgerMenuProvider activePath={pathname}>
            <div className="md:hidden">
              <BurgerMenuTrigger />
              <BurgerMenuPanel />
            </div>
          </BurgerMenuProvider>

          <div className="md:hidden">
            <Dropdown {...regionDropdownConfig} align="left" />
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
              activePath={pathname}
              ulClassName="flex items-center gap-5 lg:gap-12 text-2xl leading-none tracking-wide"
              linkClassName="pink-text-shadow rounded-md transition-colors leading-none align-middle"
            />
          </nav>
        </div>

        {/* RIGHT */}
        <nav aria-label="Shop" className="flex items-center justify-end gap-5">
          {/* desktop: region on right */}
          <div className="hidden md:block">
            <Dropdown {...regionDropdownConfig} align="right" />
          </div>

          {SHOP_LINKS.map(({ href, label, Icon }) => (
            <ImageButton key={href} href={href} ariaLabel={label}>
              <Icon size={SHOP_ICON_SIZE} />
            </ImageButton>
          ))}
        </nav>
      </div>
    </header>
  );
}
