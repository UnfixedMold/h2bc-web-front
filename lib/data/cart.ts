import 'server-only'

import { unstable_cache } from 'next/cache'
import { cookies } from 'next/headers'
import { sdk } from '@/lib/medusa'

const CART_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
  httpOnly: true,
}

const fetchCartFromAPI = (cartId: string) =>
  unstable_cache(
    async () => {
      const { cart } = await sdk.store.cart.retrieve(cartId)
      return cart
    },
    [`cart-${cartId}`],
    { tags: [`cart-${cartId}`] }
  )()

export async function getOrCreateCart() {
  const cookieStore = await cookies()
  const existingCartId = cookieStore.get('cart_id')?.value

  if (existingCartId) {
    try {
      const cart = await fetchCartFromAPI(existingCartId)
      return {
        cart,
        error: null,
      }
    } catch (error) {
      console.warn('Cart not found, creating new cart:', error)
    }
  }

  // Create new cart
  try {
    const { cart } = await sdk.store.cart.create({
      region_id: process.env.NEXT_PUBLIC_DEFAULT_REGION_ID!,
    })

    cookieStore.set('cart_id', cart.id, CART_COOKIE_OPTIONS)

    return {
      cart,
      error: null,
    }
  } catch (error) {
    console.error('Failed to create cart:', error)
    return {
      cart: null,
      error: 'Failed to create cart.',
    }
  }
}
