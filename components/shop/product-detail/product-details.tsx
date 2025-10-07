'use client'
import { useMemo, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import SizeSelector from './size-selector'
import { formatPrice } from '@/lib/utils'
import type { SizeOption, ProductVariant, ProductOption } from './types'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { addItemToCart } from '@/lib/data/cart'
import { toast } from 'sonner'

interface ProductDetailsProps {
  sizes: SizeOption[]
  variants: ProductVariant[]
  options: ProductOption[]
  alert?: string
  descriptionSlot?: ReactNode
}

export default function ProductDetails({
  sizes,
  variants,
  options,
  alert,
  descriptionSlot,
}: ProductDetailsProps) {
  const router = useRouter()
  const [size, setSize] = useState<SizeOption | null>(
    sizes.find((s) => s.available) ?? sizes[0] ?? null
  )

  const sizeOption = options.find((o) => o.title.toLowerCase() === 'size')

  const selectedVariant = useMemo(() => {
    if (!size || !sizeOption) return variants[0]

    return (
      variants.find((v) =>
        v.options.some(
          (o) => o.option_id === sizeOption.id && o.value === size.value
        )
      ) ?? variants[0]
    )
  }, [size, sizeOption, variants])

  const [isAdding, setIsAdding] = useState(false)

  const canAdd = useMemo(() => {
    return (
      selectedVariant &&
      (!selectedVariant.manage_inventory ||
        selectedVariant.inventory_quantity > 0)
    )
  }, [selectedVariant])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      toast.error('No variant selected')
      return
    }

    setIsAdding(true)
    const { error } = await addItemToCart(selectedVariant.id)
    setIsAdding(false)

    if (error) {
      toast.error(error)
    } else {
      router.refresh()
    }
  }

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
        disabled={!canAdd || isAdding}
        onClick={handleAddToCart}
      >
        {selectedVariant?.manage_inventory &&
        selectedVariant.inventory_quantity <= 0
          ? 'Out of Stock'
          : isAdding
            ? 'Adding...'
            : 'Add to cart'}
      </Button>
    </>
  )
}
