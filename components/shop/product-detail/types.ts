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
