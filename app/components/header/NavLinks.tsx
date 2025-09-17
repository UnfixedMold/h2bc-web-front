import Link from 'next/link'
import { navItems } from '../../navItems'

interface NavLinksProps {
  activePath?: string
  ulClassName?: string
  linkClassName?: string
  activeLinkClassName?: string
}

export default function NavLinks({
  activePath = '',
  ulClassName = '',
  linkClassName = '',
  activeLinkClassName = '',
}: NavLinksProps) {
    
  return (
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
  )
}
