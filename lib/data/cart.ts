'use server'

import { sdk } from '@/lib/medusa'
import { getCartId, setCartId, getRegionId } from '@/lib/cookies'

export async function getCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return {
      cart: null,
      error: 'No cart found',
    }
  }

  try {
    const { cart } = await sdk.store.cart.retrieve(cartId)
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

export async function initCart() {
  try {
    const regionId = await getRegionId()

    if (!regionId) {
      return {
        cart: null,
        error: 'No region selected',
      }
    }

    const { cart } = await sdk.store.cart.create({
      region_id: regionId,
    })

    await setCartId(cart.id)

    return {
      cart,
      error: null,
    }
  } catch (error) {
    console.error('Failed to initialize cart:', error)
    return {
      cart: null,
      error: 'Failed to initialize cart.',
    }
  }
}

export async function addItemToCart(variantId: string, quantity: number = 1) {
  try {
    let cartId = await getCartId()

    // Initialize cart if it doesn't exist
    if (!cartId) {
      const { cart, error } = await initCart()
      if (error || !cart) {
        return {
          cart: null,
          error: error || 'Failed to initialize cart.',
        }
      }
      cartId = cart.id
    }

    const { cart } = await sdk.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity,
    })

    return {
      cart,
      error: null,
    }
  } catch (error) {
    console.error('Failed to add item to cart:', error)
    return {
      cart: null,
      error: 'Failed to add item to cart.',
    }
  }
}
