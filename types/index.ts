// Cosmic file/image type
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Base Cosmic object properties
export interface CosmicObject {
  id: string
  title: string
  slug: string
  type: string
  created_at?: string
  modified_at?: string
}

// Product type
export interface Product extends CosmicObject {
  metadata: {
    name: string
    description: string
    price: number
    sku: string
    image: CosmicImage
    available: boolean
    collection: Collection | string
  }
}

// Collection type
export interface Collection extends CosmicObject {
  metadata: {
    name: string
    description: string
    cover_image: CosmicImage
  }
}

// Review type
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

// Type guard for error status
export function hasStatus(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}