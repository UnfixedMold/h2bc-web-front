import Link from 'next/link';
import { FiUser, FiShoppingCart } from 'react-icons/fi';

const SIZE = 25;

export default function ShopLinks() {
    return (
        <div className="flex items-center gap-6">
            <Link href="/profile" aria-label="Profile">
                <FiUser size={SIZE} className="text-black hover:text-pink-400 transition-colors" />
            </Link>
            <Link href="/cart" aria-label="Cart">
                <FiShoppingCart size={SIZE} className="text-black hover:text-pink-400 transition-colors" />
            </Link>
        </div>
    );
}
