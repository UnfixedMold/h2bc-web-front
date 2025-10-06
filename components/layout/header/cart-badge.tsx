import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IconBadge } from '@/components/ui/icon-badge'

export default async function CartBadge() {
  return (
    <Button variant="ghost" asChild>
      <Link href="/cart" aria-label="Cart">
        <IconBadge badge={3} badgeClassName="bg-pink-500">
          <ShoppingBag />
        </IconBadge>
      </Link>
    </Button>
  )
}
