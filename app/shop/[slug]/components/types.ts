export interface SizeOption {
  value: string
  available: boolean
  option_id: string
}

export interface ProductVariant {
  id: string
  title: string
  price: number
  currency: string
  manage_inventory: boolean
  inventory_quantity: number
  options: {
    option_id: string
    value: string
  }[]
}

export interface ProductOption {
  id: string
  title: string
}

export interface ProductDetailData {
  id: string
  name: string
  slug: string
  subtitle?: string
  description?: string
  images: { id: string; url: string }[]
  sizes: SizeOption[]
  variants: ProductVariant[]
  options: ProductOption[]
  alert?: string
}
