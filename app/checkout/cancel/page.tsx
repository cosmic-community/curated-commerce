import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Checkout Cancelled | Curated Commerce',
  description: 'Your checkout was cancelled.',
}

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      {/* Cancel Icon */}
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Checkout Cancelled
      </h1>

      <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
        No worries — your items are still in your cart. Come back whenever you&apos;re ready.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-800 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
        >
          Continue Shopping
          <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}