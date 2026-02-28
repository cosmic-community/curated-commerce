'use client'

import { useState } from 'react'
import Link from 'next/link'

interface OrderResult {
  id: string
  metadata: {
    order_number: string
    customer_email: string
    items_json: string
    total_amount: number
    status: {
      key: string
      value: string
    }
  }
  created_at: string
}

interface OrderItem {
  name: string
  quantity: number
  price: number
}

export default function OrderLookupClient() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<OrderResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`)
      const data = await response.json() as { orders?: OrderResult[]; error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to look up orders')
      }

      setOrders(data.orders ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Order Lookup</h1>
      <p className="text-gray-500 text-lg mb-8">
        Enter the email address used during checkout to view your orders.
      </p>

      {/* Lookup Form */}
      <form onSubmit={handleLookup} className="flex gap-3 mb-10">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-brand-800 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Look Up'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-lg mb-8">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Results */}
      {orders !== null && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 font-medium">No orders found for this email.</p>
              <Link
                href="/products"
                className="mt-4 inline-flex items-center text-brand-700 font-medium hover:text-brand-800 transition-colors"
              >
                Start Shopping
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">
                Found {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </p>
              {orders.map((order) => {
                let items: OrderItem[] = []
                try {
                  items = JSON.parse(order.metadata.items_json) as OrderItem[]
                } catch {
                  // invalid JSON
                }
                const statusValue = typeof order.metadata.status === 'object'
                  ? order.metadata.status.value
                  : String(order.metadata.status)

                return (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-100 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order</p>
                        <p className="text-base font-bold text-gray-900">
                          {order.metadata.order_number}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                        {statusValue}
                      </span>
                    </div>

                    {items.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.name} <span className="text-gray-400">× {item.quantity}</span>
                            </span>
                            <span className="font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <p className="text-sm text-gray-400">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        ${order.metadata.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}