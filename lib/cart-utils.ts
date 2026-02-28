import type { CartItem, CartState } from '@/types'

const CART_STORAGE_KEY = 'curated-commerce-cart'

export function getCartFromStorage(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], totalItems: 0, totalPrice: 0 }
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) {
      return { items: [], totalItems: 0, totalPrice: 0 }
    }
    const parsed = JSON.parse(stored) as CartState
    return parsed
  } catch {
    return { items: [], totalItems: 0, totalPrice: 0 }
  }
}

export function saveCartToStorage(cart: CartState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export function calculateTotals(items: CartItem[]): CartState {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return { items, totalItems, totalPrice }
}

export function addItemToCart(cart: CartState, item: CartItem): CartState {
  const existingIndex = cart.items.findIndex((i) => i.productId === item.productId)

  let newItems: CartItem[]

  if (existingIndex >= 0) {
    newItems = cart.items.map((i, idx) =>
      idx === existingIndex ? { ...i, quantity: i.quantity + item.quantity } : i
    )
  } else {
    newItems = [...cart.items, item]
  }

  const newCart = calculateTotals(newItems)
  saveCartToStorage(newCart)
  return newCart
}

export function removeItemFromCart(cart: CartState, productId: string): CartState {
  const newItems = cart.items.filter((i) => i.productId !== productId)
  const newCart = calculateTotals(newItems)
  saveCartToStorage(newCart)
  return newCart
}

export function updateItemQuantity(cart: CartState, productId: string, quantity: number): CartState {
  if (quantity <= 0) {
    return removeItemFromCart(cart, productId)
  }

  const newItems = cart.items.map((i) =>
    i.productId === productId ? { ...i, quantity } : i
  )
  const newCart = calculateTotals(newItems)
  saveCartToStorage(newCart)
  return newCart
}

export function clearCart(): CartState {
  const emptyCart: CartState = { items: [], totalItems: 0, totalPrice: 0 }
  saveCartToStorage(emptyCart)
  return emptyCart
}