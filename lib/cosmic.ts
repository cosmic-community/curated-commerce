import { createBucketClient } from '@cosmicjs/sdk'
import type { Product, Collection, Review, Page, Order } from '@/types'
import { hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch product')
  }
}

// Fetch all collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Collection[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch collections')
  }
}

// Fetch a single collection by slug
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'collections',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.object as Collection
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch collection')
  }
}

// Fetch products by collection ID
export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.collection': collectionId,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products by collection')
  }
}

// Fetch all reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

// Fetch reviews for a specific product
export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.product': productId,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews by product')
  }
}

// Changed: Added function to fetch a page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'pages',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.object as Page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch page')
  }
}

// Changed: Added function to create an order in Cosmic
export async function createOrder(orderData: {
  orderNumber: string
  customerEmail: string
  itemsJson: string
  totalAmount: number
  stripeSessionId: string
}): Promise<Order> {
  const response = await cosmic.objects.insertOne({
    title: `Order ${orderData.orderNumber}`,
    type: 'orders',
    metadata: {
      order_number: orderData.orderNumber,
      customer_email: orderData.customerEmail,
      items_json: orderData.itemsJson,
      total_amount: orderData.totalAmount,
      stripe_session_id: orderData.stripeSessionId,
      status: 'Paid',
    },
  })

  return response.object as Order
}

// Changed: Added function to fetch orders by email
export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'orders',
        'metadata.customer_email': email,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Order[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch orders')
  }
}

// Changed: Added function to fetch order by stripe session ID
export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'orders',
        'metadata.stripe_session_id': sessionId,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    const orders = response.objects as Order[]
    if (orders.length === 0) {
      return null
    }
    return orders[0] ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch order')
  }
}