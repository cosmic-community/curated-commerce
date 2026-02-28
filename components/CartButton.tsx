'use client'

import { useCart } from '@/lib/cart-context'

export default function CartButton() {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      aria-label={`Open cart (${totalItems} items)`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-700 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  )
}