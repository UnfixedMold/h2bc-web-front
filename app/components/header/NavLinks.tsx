import Link from 'next/link'
import { navItems } from '../../navItems'

interface NavLinksProps {
    activePath?: string
    ulClassName?: string
    linkClassName?: string
}

export default function NavLinks({
    activePath = '',
    ulClassName = '',
    linkClassName = ''
}: NavLinksProps) {

    return (
        <ul className={ulClassName}>
            {navItems.map(({ href, label }) => {
                const isActive = activePath === href

                return (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`font-heading accent-text-shadow transition-colors ${linkClassName} ${isActive ? "text-accent" : ''}`}
                        >
                            {label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
