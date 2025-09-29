import { NextResponse } from 'next/server'
import { sdk } from '@/lib/medusa'
import type { StoreProduct } from '@medusajs/types'

export const revalidate = 60

export async function GET() {
  try {
    const { products } = await sdk.store.product.list({
      fields:
        'id,handle,title,' +
        'images,images.url,' +
        'categories,categories.name,' +
        '*variants,+variants.inventory_quantity'
    })

    const mappedProducts = products.map((p: StoreProduct) => {

      const totalQty =
        p.variants?.reduce((sum, v: any) => sum + (v.inventory_quantity ?? 0), 0) ?? 0

 

      return {
        slug: p.handle,
        name: p.title,
        price: 0, // TODO: pricing
        image: p.images?.[0]?.url ?? null,
        hoverImage: p.images?.[1]?.url ?? null,
        soldOut: totalQty <= 0,
        category: p.categories?.[0]?.name ?? null
      }
    })



    return NextResponse.json({ products: mappedProducts })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
