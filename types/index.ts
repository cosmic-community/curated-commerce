// Cosmic image type
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Base Cosmic object
export interface CosmicObject {
  id: string
  title: string
  slug: string
  type: string
  created_at?: string
  modified_at?: string
}

// Collection
export interface Collection extends CosmicObject {
  metadata: {
    name: string
    description: string
    cover_image: CosmicImage | null
  }
}

// Product
export interface Product extends CosmicObject {
  metadata: {
    name: string
    description: string
    price: number
    sku: string
    image: CosmicImage | null
    available: boolean
    collection: Collection | null
  }
}

// Review
export interface Review extends CosmicObject {
  metadata: {
    product: Product
    reviewer_name: string
    rating: {
      key: string
      value: string
    }
    review: string
    verified_purchase: boolean
  }
}

// Page
export interface Page extends CosmicObject {
  metadata: {
    heading: string
    subtitle: string
    content: string
    hero_image: CosmicImage | null
  }
}

// Blog Post
export interface BlogPost extends CosmicObject {
  metadata: {
    title: string
    subtitle: string
    content: string
    featured_image_description: string
    tags: string
    author: string
  }
}

// Order
export interface Order extends CosmicObject {
  metadata: {
    order_number: string
    customer_email: string
    items_json: string
    total_amount: number
    stripe_session_id: string
    status: {
      key: string
      value: string
    }
  }
}

// Type guard for API errors
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Cart types
export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  image: CosmicImage | null
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}