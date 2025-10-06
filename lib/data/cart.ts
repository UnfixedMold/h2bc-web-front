'use server'

import { sdk } from '@/lib/medusa'
import { getCartId } from '@/lib/cookies'
import { cached } from '@/lib/cache'

const fetchCartFromAPI = (cartId: string) =>
  cached(
    async () => {
      const { cart } = await sdk.store.cart.retrieve(cartId)
      return cart
    },
    [`cart-${cartId}`],
    { tags: [`cart-${cartId}`] }
  )()

export async function getCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return {
      cart: null,
      error: 'No cart found',
    }
  }

  try {
    const cart = await fetchCartFromAPI(cartId)
    return {
      cart,
      error: null,
    }
  } catch (error) {
    console.error('Failed to fetch cart:', error)
    return {
      cart: null,
      error: 'Failed to load cart.',
    }
  }
}
