"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { User, ShoppingBag, ChevronDown } from 'lucide-react';
import { toast } from "sonner";
import { NavLinks } from ".";
import BurgerMenu from "./BurgerMenu";
import { useRegion } from "@/app/providers/RegionProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const SHOP_LINKS = [
  // { href: "/profile", label: "Profile", Icon: User },
  { href: "/cart", label: "Cart", Icon: ShoppingBag },
];


export default function SiteHeader() {
  const pathname = usePathname();
  const { regions, selectedRegionId, setSelectedRegionId, error } = useRegion();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load regions", {
        description: "Using default region. Please refresh the page to try again.",
      });
    }
  }, [error]);

  const regionOptions = regions.map(r => ({
    value: r.id,
    label: r.name,
    shortLabel: r.shortName
  }));
  const dropdownDisabled = regionOptions.length <= 1;
  const defaultShortName = process.env.NEXT_PUBLIC_DEFAULT_REGION_SHORT_NAME ?? "";
  const getDisplayLabel = (opt?: { value?: string }) => {
    if (dropdownDisabled) return defaultShortName;
    if (!opt?.value) return "";
    const found = regionOptions.find(o => o.value === opt.value);
    return found?.shortLabel || "";
  };
  const regionDropdownConfig = {
    options: regionOptions.map(o => ({
      value: o.value,
      label: o.label || "",
      shortLabel: o.shortLabel || ""
    })),
    value: selectedRegionId,
    onChange: setSelectedRegionId,
    getDisplayLabel,
    disabled: dropdownDisabled,
  };
  if (pathname === "/") return null;
  return (
    <header className="relative z-50 w-full px-4 sm:px-8 md:px-12 lg:px-18 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* 3-part grid always */}
      <div className="grid grid-cols-3 items-center">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* mobile: burger + region */}
          <div className="md:hidden">
            <BurgerMenu activePath={pathname} />
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" disabled={regionDropdownConfig.disabled} className="gap-1">
                  {regionDropdownConfig.getDisplayLabel({ value: regionDropdownConfig.value }) || defaultShortName}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {regionDropdownConfig.options.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => regionDropdownConfig.onChange(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
            />
          </nav>
        </div>

        {/* RIGHT */}
        <nav aria-label="Shop" className="flex items-center justify-end gap-2">
          {/* desktop: region dropdown on right */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" disabled={regionDropdownConfig.disabled} className="gap-1">
                  {regionDropdownConfig.getDisplayLabel({ value: regionDropdownConfig.value }) || defaultShortName}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {regionDropdownConfig.options.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => regionDropdownConfig.onChange(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
  );
}
