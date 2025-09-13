"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavMenu from './NavMenu';
import { unifrakturMaguntia } from '../fonts';

export default function SiteHeader() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <header className="w-full px-18 py-12 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <img src="/bw-logo.svg" alt="h2bc" className="h-20 w-auto" />
      </Link>
      <NavMenu
        activePath={pathname}
        ulClassName="flex items-center gap-3 text-xl sm:text-2xl tracking-wide"
        linkClassName={`${unifrakturMaguntia.className} hover-glow-pink px-3 py-1.5 rounded-md transition-colors`}
        activeLinkClassName="text-pink-400"
      />
    </header>
  );
}
