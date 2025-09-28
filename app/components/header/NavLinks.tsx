import Link from 'next/link'

interface NavLinksProps {
    activePath?: string
    ulClassName?: string
    linkClassName?: string
}


const navItems = [
  { href: '/shop', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]


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
