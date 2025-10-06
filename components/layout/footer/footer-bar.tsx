import SocialIcons from './social-icons'
import RightsNotice from './rights-notice'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/shipping-returns', label: 'Shipping & Returns' },
  { href: '/terms', label: 'Terms & Conditions' },
]

export default function FooterBar() {
  return (
    <footer className="w-full px-4 sm:px-8 md:px-12 lg:px-18 py-6 sm:py-8 md:py-10 lg:py-10 text-sm">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between w-full">
        {/* Left: policy links (stacked small, inline large) */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
          {FOOTER_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="link"
              asChild
              className="uppercase text-xs p-0 h-auto"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
        {/* Right group: rights notice + social icons */}
        <div className="flex items-center gap-4">
          <RightsNotice />
          <SocialIcons />
        </div>
      </div>
    </footer>
  )
}
