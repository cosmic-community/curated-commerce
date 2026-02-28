import Link from 'next/link'
import type { Product } from '@/types'
import AddToCartButton from '@/components/AddToCartButton'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, image, collection, available } = product.metadata

  return (
    <div className="group block">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden border border-gray-100 group-hover:border-gray-200 transition-all duration-300">
          {image ? (
            <img
              src={`${image.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
              alt={name}
              width={400}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <svg className="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
              </svg>
            </div>
          )}

          {/* Availability Badge */}
          {available === false && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-gray-900/80 text-white text-xs font-medium rounded-md backdrop-blur-sm">
              Sold Out
            </div>
          )}

          {/* Collection Badge */}
          {collection && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-md backdrop-blur-sm">
              {collection.metadata.name}
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </Link>
      {/* Changed: Added Add to Cart button below each product card */}
      <div className="mt-3">
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}