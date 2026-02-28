// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getReviewsByProduct } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'
import AddToCartButton from '@/components/AddToCartButton'
import ReactMarkdown from 'react-markdown'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.metadata.name} | Curated Commerce`,
    description: `${product.metadata.name} — $${product.metadata.price}`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + parseInt(r.metadata.rating.value, 10), 0) / reviews.length
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <Link href="/products" className="hover:text-gray-700 transition-colors">Products</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-gray-900 font-medium">{product.metadata.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100">
          {product.metadata.image ? (
            <img
              src={`${product.metadata.image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Collection Badge */}
          {product.metadata.collection && (
            <Link
              href={`/collections/${product.metadata.collection.slug}`}
              className="inline-flex items-center self-start px-3 py-1 bg-brand-100 text-brand-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 hover:bg-brand-200 transition-colors"
            >
              {product.metadata.collection.metadata.name}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.metadata.name}</h1>

          {/* Rating summary */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-amber-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900 mt-6">
            ${product.metadata.price.toFixed(2)}
          </p>

          {/* Availability */}
          <div className="mt-4 flex items-center gap-2">
            {product.metadata.available !== false ? (
              <>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                <span className="text-sm font-medium text-emerald-700">In Stock</span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <span className="text-sm font-medium text-red-700">Out of Stock</span>
              </>
            )}
          </div>

          {/* SKU */}
          {product.metadata.sku && (
            <p className="mt-2 text-sm text-gray-400">
              SKU: {product.metadata.sku}
            </p>
          )}

          {/* Changed: Added Add to Cart button */}
          <AddToCartButton product={product} />

          {/* Description */}
          {product.metadata.description && (
            <div className="mt-8 prose">
              <ReactMarkdown>{product.metadata.description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16 pt-16 border-t border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <>
            <p className="text-gray-500 mb-8">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} for this product
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 mt-4">No reviews yet for this product.</p>
        )}
      </section>
    </div>
  )
}