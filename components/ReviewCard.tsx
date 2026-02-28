import Link from 'next/link'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const { reviewer_name, rating, review: reviewText, verified_purchase, product } = review.metadata
  const ratingNumber = parseInt(rating.value, 10)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < ratingNumber ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <p className="mt-4 text-gray-600 leading-relaxed flex-1 text-sm">
        &ldquo;{reviewText}&rdquo;
      </p>

      {/* Reviewer Info */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-brand-700">
              {reviewer_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{reviewer_name}</p>
            {verified_purchase && (
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified Purchase
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Link */}
      {showProduct && product && (
        <Link
          href={`/products/${product.slug}`}
          className="mt-4 flex items-center gap-3 p-3 -mx-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {product.metadata?.image && (
            <img
              src={`${product.metadata.image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={product.title}
              width={40}
              height={40}
              className="w-10 h-10 rounded-md object-cover"
            />
          )}
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Review for</p>
            <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
          </div>
        </Link>
      )}
    </div>
  )
}