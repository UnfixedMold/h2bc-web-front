"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import NavLinks from "../NavLinks";

interface BurgerMenuProps {
  activePath: string;
  linkClassName?: string;
  activeLinkClassName?: string;
  mobileUlClassName?: string;
  buttonClassName?: string;
  panelClassName?: string;
}

export default function BurgerMenu({
  activePath,
  linkClassName = "",
  activeLinkClassName = "",
  mobileUlClassName = "flex flex-col items-stretch py-2",
  buttonClassName = "p-2 rounded-md hover:bg-black/5 active:bg-black/10 transition-colors",
  panelClassName = "transition-all duration-200",
}: BurgerMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activePath]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-links"
        onClick={() => setOpen((o) => !o)}
        className={buttonClassName}
      >
        <span className="sr-only">Menu</span>
        {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      <div
        id="mobile-nav-links"
        className={`absolute inset-x-0 top-full z-40 ${panelClassName} ${open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"}`}
      >
        <div className="bg-white/95 backdrop-blur border-t border-black/10 shadow-lg">
          <NavLinks
            activePath={activePath}
            ulClassName={mobileUlClassName || "flex flex-col items-stretch text-center py-2 divide-y divide-black/10"}
            linkClassName={`${linkClassName} block w-full text-center px-6 py-4 text-2xl`}
            activeLinkClassName={activeLinkClassName}
          />
        </div>
      </div>
    </div>
  );
}
