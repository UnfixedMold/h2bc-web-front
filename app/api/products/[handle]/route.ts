import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sdk } from '@/lib/medusa'
import { validateQueryParams } from '@/lib/utils'

const querySchema = z.object({
  region_id: z.string().min(1)
})

export const revalidate = 60

export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const validation = validateQueryParams(request, querySchema)
    if (!validation.success) {
      return validation.response
    }

    const { region_id: regionId } = validation.data
    const { handle } = await params

    const { products } = await sdk.store.product.list({
      handle,
      region_id: regionId,
      fields:
        'id,handle,title,subtitle,description,*categories,*options,metadata,' +
        'images,images.url,' +
        '*variants, *variants.options, *variants.inventory_quantity'
    })

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const product = products[0]

    const sizeOption = product.options?.find(o => o.title?.toLowerCase() === 'size')

    const sizeVariants = product.variants
      ?.map(v => ({
        size: v.options?.find(o => o.option_id === sizeOption?.id)?.value,
        rank: v.variant_rank,
        available: v.manage_inventory ? (v.inventory_quantity ?? 0) > 0 : true
      }))
      .filter(item => item.size) ?? []

    const sizeAvailabilityMap = new Map<string, boolean>()
    sizeVariants.forEach(item => {
      const current = sizeAvailabilityMap.get(item.size!)
      sizeAvailabilityMap.set(item.size!, current === undefined ? item.available : current || item.available)
    })

    const sizes = [...new Map(sizeVariants.map(item => [item.size, item.rank])).entries()]
      .filter((entry): entry is [string, number] => entry[1] != null)
      .sort((a, b) => a[1] - b[1])
      .map(([size]) => ({ value: size!, available: sizeAvailabilityMap.get(size!) ?? true }))

    const categoryAlert = product.categories?.[0]?.metadata?.alert as string | undefined

    const variants = product.variants?.map(v => ({
      id: v.id,
      title: v.title,
      price: v.calculated_price?.calculated_amount ?? null,
      currency: v.calculated_price?.currency_code,
      inventory_quantity: v.inventory_quantity ?? 0,
      manage_inventory: v.manage_inventory ?? false,
      options: v.options?.map(o => ({
        option_id: o.option_id,
        value: o.value
      })) ?? []
    })) ?? []

    const mappedProduct = {
      slug: product.handle,
      name: product.title,
      subtitle: product.subtitle ?? '',
      images: product.images?.filter(img => img.url).map((img) => ({ id: img.id, url: img.url })) ?? [],
      sizes,
      description: product.description ?? '',
      alert: categoryAlert,
      variants,
      options: product.options?.map(o => ({
        id: o.id,
        title: o.title
      })) ?? []
    }

    return NextResponse.json({ product: mappedProduct })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
