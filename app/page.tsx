'use client'

import Link from 'next/link'
import { unifrakturMaguntia } from './fonts'
import FooterBar from './components/FooterBar'

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="aspect-square w-56 sm:w-64 md:w-72">
          {/* @ts-ignore */}
          <model-viewer
            src="/y2k_sport_sunglass.glb"
            camera-controls
            disable-zoom
            disable-pan
            interaction-prompt="none"
            auto-rotate
            auto-rotate-speed="500"
            class="block w-full h-full"
            style={{
              '--progress-bar-height': 0,
              '--progress-bar-color': 'transparent',
              '--poster-color': 'transparent',
            } as any}
          />
        </div>

        <nav aria-label="Main navigation" className="mt-8 md:mt-0">
          <ul className="space-y-4 sm:space-y-6 text-xl sm:text-2xl text-center md:text-left">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${unifrakturMaguntia.className} hover-glow-pink`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
  <FooterBar />
    </div>
  )
}
