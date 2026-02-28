// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

// Cosmic file/image type
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Collection type
export interface Collection extends CosmicObject {
  type: 'collections'
  metadata: {
    name: string
    description?: string
    cover_image?: CosmicImage
  }
}

// Product type
export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    name: string
    description?: string
    price: number
    sku?: string
    image?: CosmicImage
    available?: boolean
    collection?: Collection
  }
}

// Rating type from select-dropdown
export interface RatingValue {
  key: string
  value: string
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    product?: Product
    reviewer_name: string
    rating: RatingValue
    review: string
    verified_purchase?: boolean
  }
}

// Page type for static pages like About
export interface Page extends CosmicObject {
  metadata: {
    heading: string
    subheading: string
    content: string
    hero_image?: CosmicImage
    sections?: PageSection[]
  }
}

// Individual page section for structured content
export interface PageSection {
  title: string
  content: string
  image?: CosmicImage
}

// Order type stored in Cosmic
export interface Order extends CosmicObject {
  metadata: {
    stripe_session_id: string
    customer_email: string
    items: string
    total_amount: number
    order_status: {
      key: string
      value: string
    }
  }
}

// Cart item for client-side cart
export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  quantity: number
  image?: CosmicImage
}

// Helper to check if error has status
export function hasStatus(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}