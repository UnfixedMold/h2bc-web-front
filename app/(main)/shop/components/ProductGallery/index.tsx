import ProductCard from './ProductCard'
import NoProductsLabel from './NoProductsLabel'
import type { ProductItem } from '../../types'

const PRIORITY_COUNT = 4

interface ProductGalleryProps {
  products: ProductItem[]
}

export default function ProductGallery({ products }: ProductGalleryProps) {
  if (products.length === 0) {
    return <NoProductsLabel />
  }

  return products.map((p, idx) => (
    <ProductCard key={p.slug} {...p} priority={idx < PRIORITY_COUNT} />
  ))
}
