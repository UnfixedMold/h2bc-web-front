import { FiUser, FiShoppingCart } from 'react-icons/fi';
import ImageButton from '@/app/components/ui/buttons/ImageButton';

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
                <ImageButton key={href} href={href} ariaLabel={label}>
                    <Icon size={ICON_SIZE} />
                </ImageButton>
            ))}
        </div>
    );
}
