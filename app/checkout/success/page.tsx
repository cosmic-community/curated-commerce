import type { Metadata } from 'next'
import Link from 'next/link'
import ClearCartOnSuccess from '@/components/ClearCartOnSuccess'

export const metadata: Metadata = {
  title: 'Order Confirmed | Curated Commerce',
  description: 'Your order has been placed successfully.',
}

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      <ClearCartOnSuccess />

      {/* Success Icon */}
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Order Confirmed!
      </h1>

      <p className="text-lg text-gray-500 mb-2 max-w-md mx-auto">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {session_id && (
        <p className="text-sm text-gray-400 mb-8">
          Order reference: <span className="font-mono">{session_id.slice(-8)}</span>
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
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