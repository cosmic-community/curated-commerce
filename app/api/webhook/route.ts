import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/cosmic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      await createOrder({
        stripeSessionId: session.id,
        customerEmail: session.customer_details?.email ?? 'unknown@example.com',
        items: session.metadata?.cart_items ?? '[]',
        totalAmount: (session.amount_total ?? 0) / 100,
      })
    } catch (error) {
      console.error('Failed to create order in Cosmic:', error)
    }
  }

  return NextResponse.json({ received: true })
}