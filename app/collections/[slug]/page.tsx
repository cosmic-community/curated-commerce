// app/collections/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCollectionBySlug, getProductsByCollection } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: `${collection.metadata.name} | Curated Commerce`,
    description: collection.metadata.description || `Browse products in the ${collection.metadata.name} collection.`,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id)
  const availableProducts = products.filter((p) => p.metadata.available !== false)

  return (
    <div>
      {/* Collection Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        {collection.metadata.cover_image && (
          <div className="absolute inset-0 opacity-40">
            <img
              src={`${collection.metadata.cover_image.imgix_url}?w=1920&h=500&fit=crop&auto=format,compress`}
              alt=""
              className="w-full h-full object-cover"
              width={1920}
              height={500}
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-white font-medium">{collection.metadata.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{collection.metadata.name}</h1>
          {collection.metadata.description && (
            <p className="mt-4 text-lg text-gray-300 max-w-2xl">{collection.metadata.description}</p>
          )}
          <p className="mt-4 text-sm text-gray-400">
            {availableProducts.length} {availableProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {availableProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products in this collection yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center text-brand-700 font-medium hover:text-brand-800 transition-colors"
            >
              Browse all products
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}