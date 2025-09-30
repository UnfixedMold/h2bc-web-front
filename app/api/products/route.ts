import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sdk } from '@/lib/medusa'
import type { StoreProduct } from '@medusajs/types'
import { validateQueryParams } from '@/lib/utils'

const querySchema = z.object({
  region_id: z.string().min(1)
})

export const revalidate = 60

export async function GET(request: Request) {
  try {
    const validation = validateQueryParams(request, querySchema)
    if (!validation.success) {
      return validation.response
    }

    const { region_id: regionId } = validation.data

    const { products } = await sdk.store.product.list({
      region_id: regionId,
      fields:
        'id,handle,title,' +
        'images,images.url,' +
        'categories,categories.name,' +
        '+variants.*,*variants.calculated_price,+variants.inventory_quantity'
    })

    const mappedProducts = products.map((p: StoreProduct) => {
      const totalQty =
        p.variants?.reduce((sum, v: any) => sum + (v.inventory_quantity ?? 0), 0) ?? 0

      const firstVariant = p.variants?.find((v: any) => v.rank === 0) ?? p.variants?.[0]
      const calculatedPrice = firstVariant?.calculated_price?.calculated_amount ?? null

      return {
        slug: p.handle,
        name: p.title,
        price: calculatedPrice,
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
