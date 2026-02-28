import type { Metadata } from 'next'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import { getOrderBySessionId } from '@/lib/cosmic'
import ClearCartOnSuccess from '@/components/ClearCartOnSuccess'

export const metadata: Metadata = {
  title: 'Order Confirmed | Curated Commerce',
  description: 'Your order has been confirmed. Thank you for your purchase!',
}

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

interface OrderItem {
  name: string
  quantity: number
  price: number
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">No session found</h1>
        <p className="text-gray-500 mb-8">We couldn&apos;t find your checkout session.</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-brand-800 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    )
  }

  let sessionEmail: string | null = null
  let sessionTotal: number | null = null
  let orderItems: OrderItem[] = []

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    sessionEmail = session.customer_details?.email ?? null
    sessionTotal = session.amount_total ? session.amount_total / 100 : null

    if (session.metadata?.items_json) {
      orderItems = JSON.parse(session.metadata.items_json) as OrderItem[]
    }
  } catch {
    // Session may not be found — we'll show a generic success
  }

  // Try to find the order in Cosmic (may not exist yet if webhook hasn't fired)
  const order = await getOrderBySessionId(session_id)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Changed: Clear cart on mount */}
      <ClearCartOnSuccess />

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
        <p className="text-lg text-gray-500">
          Thank you for your purchase. Your order is being processed.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
        {order && (
          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="text-lg font-bold text-gray-900">{order.metadata.order_number}</p>
          </div>
        )}

        {sessionEmail && (
          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500">Confirmation will be sent to</p>
            <p className="text-base font-medium text-gray-900">{sessionEmail}</p>
          </div>
        )}

        {orderItems.length > 0 && (
          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-4">Items Ordered</p>
            <ul className="space-y-3">
              {orderItems.map((item, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} <span className="text-gray-400">× {item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sessionTotal !== null && (
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total Paid</span>
            <span className="text-xl font-bold text-gray-900">${sessionTotal.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/products"
          className="inline-flex items-center px-8 py-3.5 bg-brand-800 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
        >
          Continue Shopping
          <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}