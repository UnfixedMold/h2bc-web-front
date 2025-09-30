"use client";
import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'
import { useRegion } from '@/app/providers/RegionProvider'

export type Category = 'ALL' | 'PRINT ON DEMAND' | 'BELTS' | 'BEANIES' | 'JEWELERY'

export interface ProductItem {
  slug: string
  name: string
  price: number | null
  image: string
  hoverImage?: string
  soldOut?: boolean
  category: Exclude<Category, 'ALL'>
}

const CATEGORIES: Category[] = ['ALL', 'PRINT ON DEMAND', 'BELTS', 'BEANIES', 'JEWELERY']

export const PRIORITY_COUNT = 4

export default function ShopContent({ products }: { products: ProductItem[] }) {
  const [active, setActive] = useState<Category>('ALL')
  const { currencyCode } = useRegion()

  const sorted = useMemo(() => {
    const inStock = products.filter(p => !p.soldOut)
    const sold = products.filter(p => p.soldOut)
    return [...inStock, ...sold]
  }, [products])

  const filtered = useMemo(() => {
    if (active === 'ALL') return sorted
    return sorted.filter(p => p.category === active)
  }, [sorted, active])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
      <CategoryFilter categories={CATEGORIES} active={active} onChange={setActive} />

      <section>
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <span className="font-script text-5xl text-foreground select-none">no items</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12">
            {filtered.map((p, idx) => (
              <ProductCard key={p.slug} {...p} currencyCode={currencyCode} priority={idx < PRIORITY_COUNT} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
