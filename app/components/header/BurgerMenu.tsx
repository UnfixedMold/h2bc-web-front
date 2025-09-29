"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";

interface BurgerMenuProps {
  activePath: string;
}

export default function BurgerMenu({ activePath }: BurgerMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [activePath]);

  return (
    <>
      <Button variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav-links" onClick={() => setOpen(!open)}>
        {open ? <FiX /> : <FiMenu />}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/0"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div
        id="mobile-nav-links"
        className={`absolute inset-x-0 top-full z-50 transition-all duration-200 ${open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/95 backdrop-blur border-t border-black/10 shadow-lg">
          <NavLinks
            activePath={activePath}
            ulClassName="flex flex-col items-stretch py-2 divide-y divide-black/10"
            linkClassName="block w-full text-center px-6 py-4 text-2xl"
          />
        </div>
      </div>
    </>
  );
}
