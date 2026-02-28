'use client'

import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, setIsCartOpen } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.metadata.name,
      price: product.metadata.price,
      quantity: 1,
      image: product.metadata.image,
    })
    setAdded(true)
    setIsCartOpen(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const isAvailable = product.metadata.available !== false

  if (!isAvailable) {
    return (
      <button
        disabled
        className="w-full mt-8 px-8 py-4 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
      >
        Out of Stock
      </button>
    )
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full mt-8 px-8 py-4 font-semibold rounded-lg transition-all duration-200 ${
        added
          ? 'bg-emerald-600 text-white'
          : 'bg-brand-800 text-white hover:bg-brand-700 active:scale-[0.98]'
      }`}
    >
      {added ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Added to Cart
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Add to Cart
        </span>
      )}
    </button>
  )
}