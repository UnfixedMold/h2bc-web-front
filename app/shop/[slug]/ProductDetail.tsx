"use client";
import { useMemo, useState } from 'react'
import TextButton from '@/app/components/ui/TextButton'
import OutlineButton from '@/app/components/ui/OutlineButton'
import StepperButton from '@/app/components/ui/StepperButton'
import ProductGallery from './ProductGallery'

export interface ProductDetailData {
  slug: string
  name: string
  price: number
  currency?: string
  images: string[]
  sizes: string[]
  description?: string
  soldOut?: boolean
  specs?: string[]
}

function formatPriceEUR(value: number, currency = 'EUR') {
  const formatted = value.toLocaleString('lt-LT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `€${formatted} ${currency}`
}

export default function ProductDetail({ data }: { data: ProductDetailData }) {
  const [size, setSize] = useState<string | null>(data.sizes[0] ?? null)
  const [qty, setQty] = useState(1)

  const canAdd = useMemo(() => !data.soldOut && (!!size || data.sizes.length === 0) && qty > 0, [data.soldOut, size, data.sizes.length, qty])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
      {/* Left: Gallery */}
      <ProductGallery images={data.images} name={data.name} />

      {/* Right: Details */}
      <section>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-wide">{data.name}</h1>
        <div className="mt-2 text-xl sm:text-2xl">{formatPriceEUR(data.price, data.currency)}</div>

        {data.sizes.length > 0 && (
          <div className="mt-6">
            <div className="mb-2 text-sm">Size</div>
            <div className="flex flex-wrap gap-3">
              {data.sizes.map(s => (
                <TextButton key={s} active={size === s} onClick={() => setSize(s)}>{s}</TextButton>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="mb-2 text-sm">Quantity</div>
          <StepperButton value={qty} onChange={setQty} min={1} />
        </div>

        {data.description && (
          <p className="mt-6 max-w-prose leading-relaxed">{data.description}</p>
        )}
        {data.specs && data.specs.length > 0 && (
          <ul className="mt-4 list-disc pl-6 space-y-1 max-w-prose">
            {data.specs.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <OutlineButton
            fullWidth
            disabled={!canAdd}
            onClick={() => {
              if (!canAdd) return
              console.log('Add to cart', { slug: data.slug, size, qty })
            }}
          >
            {data.soldOut ? 'Sold Out' : 'Add to cart'}
          </OutlineButton>
        </div>
      </section>
    </div>
  )
}
