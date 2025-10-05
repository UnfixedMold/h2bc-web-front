"use client";
import { useMemo, useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import SizeSelector from './SizeSelector'
import { formatPrice } from '@/lib/utils'
import type { SizeOption, ProductVariant, ProductOption } from './types'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

interface ProductDetailsProps {
  slug: string
  sizes: SizeOption[]
  variants: ProductVariant[]
  options: ProductOption[]
  alert?: string
  descriptionSlot?: ReactNode
}

export default function ProductDetails({
  slug,
  sizes,
  variants,
  options,
  alert,
  descriptionSlot
}: ProductDetailsProps) {
  const [size, setSize] = useState<SizeOption | null>(
    sizes.find(s => s.available) ?? sizes[0] ?? null
  )

  const sizeOption = options.find(o => o.title.toLowerCase() === 'size')

  const selectedVariant = useMemo(() => {
    if (!size || !sizeOption) return variants[0]

    return variants.find(v =>
      v.options.some(o => o.option_id === sizeOption.id && o.value === size.value)
    ) ?? variants[0]
  }, [size, sizeOption, variants])

  const canAdd = useMemo(() => {
    return selectedVariant && (!selectedVariant.manage_inventory || selectedVariant.inventory_quantity > 0)
  }, [selectedVariant])

  return (
    <>
      <div className="mt-2 text-xl sm:text-2xl">
        {formatPrice(selectedVariant?.price, selectedVariant?.currency)}
      </div>

      {alert && (
        <Alert className="mt-6">
          <Info className="h-4 w-4" />
          <AlertDescription>{alert}</AlertDescription>
        </Alert>
      )}

      <SizeSelector sizes={sizes} selectedSize={size} onSizeChange={setSize} />

      {descriptionSlot}

      <Button
        variant="default"
        size="lg"
        className="w-full mt-8"
        disabled={!canAdd}
        onClick={() => {
          if (!canAdd) return
          console.log('Add to cart', { slug, variantId: selectedVariant?.id, size })
        }}
      >
        {selectedVariant?.manage_inventory && selectedVariant.inventory_quantity <= 0 ? 'Out of Stock' : 'Add to cart'}
      </Button>
    </>
  )
}
