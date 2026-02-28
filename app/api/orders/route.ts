import { NextRequest, NextResponse } from 'next/server'
import { getOrdersByEmail } from '@/lib/cosmic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const orders = await getOrdersByEmail(email)
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Order lookup error:', error)
    return NextResponse.json({ error: 'Failed to look up orders' }, { status: 500 })
  }
}