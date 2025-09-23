"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import NavLinks from "./NavLinks";

type Ctx = { open: boolean; setOpen: (v: boolean) => void; activePath: string };
const Ctx = createContext<Ctx | null>(null);

export function BurgerMenuProvider({ activePath, children }: { activePath: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [activePath]);
  return <Ctx.Provider value={{ open, setOpen, activePath }}>{children}</Ctx.Provider>;
}

export function BurgerMenuTrigger() {
  const ctx = useContext(Ctx)!;
  const { open, setOpen } = ctx;
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-nav-links"
      onClick={() => setOpen(!open)}
      className="p-2 rounded-md hover:bg-black/5 active:bg-black/10 transition-colors"
    >
      <span className="sr-only">Menu</span>
      {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
    </button>
  );
}

export function BurgerMenuPanel() {
  const { open, setOpen, activePath } = useContext(Ctx)!;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/0"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <div
        id="mobile-nav-links"
        className={`absolute inset-x-0 top-full z-50 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/95 backdrop-blur border-t border-black/10 shadow-lg">
          <NavLinks
            activePath={activePath}
            ulClassName="flex flex-col items-stretch py-2 divide-y divide-black/10"
            linkClassName="pink-text-shadow rounded-md transition-colors leading-none align-middle block w-full text-center px-6 py-4 text-2xl"
          />
        </div>
      </div>
    </>
  );
}
