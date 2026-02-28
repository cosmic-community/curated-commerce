'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { CartItem, CartState } from '@/types'
import {
  getCartFromStorage,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart as clearCartStorage,
} from '@/lib/cart-utils'

interface CartContextValue {
  cart: CartState
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [], totalItems: 0, totalPrice: 0 })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCart(getCartFromStorage())
    setMounted(true)
  }, [])

  const addItem = useCallback((item: CartItem) => {
    setCart((prev) => addItemToCart(prev, item))
  }, [])

  const removeItem = useCallback((productId: string) => {
    setCart((prev) => removeItemFromCart(prev, productId))
  }, [])

  const updateQuantityHandler = useCallback((productId: string, quantity: number) => {
    setCart((prev) => updateItemQuantity(prev, productId, quantity))
  }, [])

  const clearCartHandler = useCallback(() => {
    setCart(clearCartStorage())
  }, [])

  if (!mounted) {
    return (
      <CartContext.Provider
        value={{
          cart: { items: [], totalItems: 0, totalPrice: 0 },
          addItem: () => {},
          removeItem: () => {},
          updateQuantity: () => {},
          clearCart: () => {},
          isCartOpen: false,
          setIsCartOpen: () => {},
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity: updateQuantityHandler,
        clearCart: clearCartHandler,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}