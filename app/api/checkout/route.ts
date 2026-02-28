import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import type { CartItem } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
})

interface CheckoutRequestBody {
  items: CartItem[]
}

function isValidCheckoutBody(body: unknown): body is CheckoutRequestBody {
  if (!body || typeof body !== 'object') return false
  const obj = body as Record<string, unknown>
  if (!Array.isArray(obj.items)) return false
  return obj.items.every(
    (item: unknown) =>
      item &&
      typeof item === 'object' &&
      typeof (item as Record<string, unknown>).id === 'string' &&
      typeof (item as Record<string, unknown>).name === 'string' &&
      typeof (item as Record<string, unknown>).price === 'number' &&
      typeof (item as Record<string, unknown>).quantity === 'number'
  )
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()

    if (!isValidCheckoutBody(body)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { items } = body

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    const origin = request.headers.get('origin') ?? 'http://localhost:3000'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          ...(item.image?.imgix_url
            ? { images: [`${item.image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`] }
            : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        cart_items: JSON.stringify(
          items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          }))
        ),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}