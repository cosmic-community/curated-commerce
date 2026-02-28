import type { Metadata } from 'next'
import { getProducts, getCollections } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Products | Curated Commerce',
  description: 'Browse our full collection of handcrafted products.',
}

export default async function ProductsPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ])

  const availableProducts = products.filter((p) => p.metadata.available !== false)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-500 text-lg">
          {availableProducts.length} {availableProducts.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      {/* Collection Filters */}
      {collections.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="inline-flex items-center px-4 py-2 bg-brand-800 text-white text-sm font-medium rounded-full">
            All
          </span>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              {collection.metadata.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {availableProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products available at the moment.</p>
        </div>
      )}
    </div>
  )
}