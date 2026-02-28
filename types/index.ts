// Cosmic file/image type
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Collection type
export interface Collection {
  id: string
  title: string
  slug: string
  type: string
  created_at?: string
  modified_at?: string
  metadata: {
    name: string
    description: string
    cover_image: CosmicImage
  }
}

// Product type
export interface Product {
  id: string
  title: string
  slug: string
  type: string
  created_at?: string
  modified_at?: string
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

// Review rating type
export interface ReviewRating {
  key: string
  value: string
}

// Review type
export interface Review {
  id: string
  title: string
  slug: string
  type: string
  created_at?: string
  modified_at?: string
  metadata: {
    product: Product
    reviewer_name: string
    rating: ReviewRating
    review: string
    verified_purchase: boolean
  }
}

// Changed: Added Page type for CMS-powered pages
export interface Page {
  id: string
  title: string
  slug: string
  type: string
  created_at?: string
  modified_at?: string
  metadata: {
    heading: string
    subtitle: string
    content: string
    hero_image?: CosmicImage
  }
}

// Type guard for API errors with status
export function hasStatus(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}