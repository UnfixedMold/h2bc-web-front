import Link from 'next/link';
import { FiUser, FiShoppingCart } from 'react-icons/fi';

const ICON_SIZE = 25;

const SHOP_LINKS = [
    {
        href: '/profile',
        label: 'Profile',
        Icon: FiUser,
    },
    {
        href: '/cart',
        label: 'Cart',
        Icon: FiShoppingCart,
    },
];

export default function ShopLinks() {
    return (
        <div className="flex items-center gap-6">
            {SHOP_LINKS.map(({ href, label, Icon }) => (
                <Link key={href} href={href} aria-label={label}>
                    <Icon size={ICON_SIZE} className="text-black hover:text-pink-400 transition-colors align-middle" />
                </Link>
            ))}
        </div>
    );
}
