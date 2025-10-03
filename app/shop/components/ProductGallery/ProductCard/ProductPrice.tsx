"use client";
import { formatPrice } from '@/lib/utils'
import { useRegion } from '@/app/providers/RegionProvider'

interface ProductPriceProps {
    price: number | null
}

export default function ProductPrice({ price }: ProductPriceProps) {
    const { currencyCode } = useRegion()

    return (
        <div className="mt-1 text-center text-base font-medium">
            {formatPrice(price, currencyCode)}
        </div>
    )
}
