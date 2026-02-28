import type { Metadata } from 'next'
import OrderLookupClient from '@/components/OrderLookupClient'

export const metadata: Metadata = {
  title: 'Order Lookup | Curated Commerce',
  description: 'Look up your past orders by email address.',
}

export default function OrdersPage() {
  return <OrderLookupClient />
}