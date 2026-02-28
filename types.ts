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
    cover_image?: {
      url: string
      imgix_url: string
    }
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
    image?: {
      url: string
      imgix_url: string
    }
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

// Changed: Page type for static pages like About
export interface Page extends CosmicObject {
  metadata: {
    heading: string
    subheading: string
    content: string
    hero_image?: CosmicImage
    sections?: PageSection[]
  }
}

// Changed: Individual page section for structured content
export interface PageSection {
  title: string
  content: string
  image?: CosmicImage
}

// Helper to check if error has status
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}