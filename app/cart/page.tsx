import type { Metadata } from 'next'
import CartPageClient from '@/components/CartPageClient'

export const metadata: Metadata = {
  title: 'Shopping Cart | Curated Commerce',
  description: 'Review your shopping cart and proceed to checkout.',
}

export default function CartPage() {
  return <CartPageClient />
}