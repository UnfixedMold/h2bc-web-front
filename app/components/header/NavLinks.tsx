import Link from 'next/link'
import { navItems } from '../../navItems'
import { unifrakturMaguntia } from '@/app/fonts'

interface NavLinksProps {
    activePath?: string
    ulClassName?: string
    linkClassName?: string
}

export default function NavLinks({
    activePath = '',
    ulClassName = '',
    linkClassName = '',
}: NavLinksProps) {

    return (
        <ul className={ulClassName}>

            {navItems.map(({ href, label }) => {

                const isActive = activePath === href

                return (
                    <li key={href}>
                        <Link
                            href={href}
                            className={[unifrakturMaguntia.className, linkClassName, isActive ? "text-pink-400" : ''].filter(Boolean).join(' ')}
                        >
                            {label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
