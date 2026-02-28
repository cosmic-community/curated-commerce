import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createOrder } from '@/lib/cosmic'
import type Stripe from 'stripe'

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CC-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      await createOrder({
        orderNumber: generateOrderNumber(),
        customerEmail: session.customer_details?.email ?? 'unknown@example.com',
        itemsJson: session.metadata?.items_json ?? '[]',
        totalAmount: (session.amount_total ?? 0) / 100,
        stripeSessionId: session.id,
      })
    } catch (error) {
      console.error('Failed to create order in Cosmic:', error)
      // Still return 200 to acknowledge receipt to Stripe
    }
  }

  return NextResponse.json({ received: true })
}