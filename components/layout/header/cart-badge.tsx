import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IconBadge } from '@/components/ui/icon-badge'

interface CartBadgeProps {
  itemCount: number
}

export default async function CartBadge({ itemCount }: CartBadgeProps) {
  return (
    <Button variant="ghost" asChild>
      <Link href="/cart" aria-label="Cart">
        {itemCount ? (
          <IconBadge badge={`${itemCount}`} badgeClassName="bg-pink-500">
            <ShoppingBag />
          </IconBadge>
        ) : (
          <ShoppingBag />
        )}
      </Link>
    </Button>
  )
}
