import Link from 'next/link'
import { navItems } from '../navItems'

interface NavMenuProps {
  activePath?: string
  navClassName?: string
  ulClassName?: string
  linkClassName?: string
  activeLinkClassName?: string
}

export default function NavMenu({
  activePath,
  navClassName = '',
  ulClassName = '',
  linkClassName = '',
  activeLinkClassName = '',
}: NavMenuProps) {
  return (
    <nav aria-label="Main navigation" className={navClassName}>
      <ul className={ulClassName}>
        {navItems.map(({ href, label }) => {
          const isActive = activePath === href
          return (
            <li key={href}>
              <Link
                href={href}
                className={[linkClassName, isActive ? activeLinkClassName : ''].filter(Boolean).join(' ')}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
