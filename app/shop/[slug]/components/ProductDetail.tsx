"use client";
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import ProductGallery from './Gallery/ProductGallery'
import Heading from '@/app/components/Heading'
import { cn } from '@/lib/utils';

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

  const canAdd = useMemo(() => !data.soldOut && (!!size || data.sizes.length === 0), [data.soldOut, size, data.sizes.length])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Gallery */}
      <ProductGallery images={data.images} name={data.name} />

      {/* Right: Details */}
      <section>
        <Heading level={1}>{data.name}</Heading>
        <div className="mt-2 text-xl sm:text-2xl">{formatPriceEUR(data.price, data.currency)}</div>

        {data.sizes.length > 0 && (
          <div className="mt-6">
            <div className="mb-2 text-sm">Size</div>
            <div className='flex gap-4'>
              {data.sizes.map(s => (
                <Button
                  key={s}
                  variant="link"
                  onClick={() => setSize(s)}
                  className={cn(size === s ? 'font-bold' : 'font-normal', "text-md", "p-0")}
                >
                  {`${size === s ? '>' : ' '} ${s}`}
                </Button>
              ))}
            </div>
          </div>
        )}

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

        <Button
          variant="default"
          size="lg"
          className="w-full mt-8"
          disabled={!canAdd}
          onClick={() => {
            if (!canAdd) return
            console.log('Add to cart', { slug: data.slug, size })
          }}
        >
          {data.soldOut ? 'Sold Out' : 'Add to cart'}
        </Button>
      </section>
    </div>
  )
}
