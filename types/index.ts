// Changed: Added hasStatus type guard for error handling
export function hasStatus(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}

// Cosmic file/image type
export interface CosmicFile {
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

// Product
export interface Product extends CosmicObject {
  metadata: {
    name: string
    description: string
    price: number
    sku: string
    image: CosmicFile
    available: boolean
    collection: Collection | string
  }
}

// Collection
export interface Collection extends CosmicObject {
  metadata: {
    name: string
    description: string
    cover_image: CosmicFile
  }
}

// Review
export interface Review extends CosmicObject {
  metadata: {
    product: Product | string
    reviewer_name: string
    rating: { key: string; value: string }
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
    hero_image?: CosmicFile
  }
}

// Changed: Added BlogPost type for the blog-posts object type
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