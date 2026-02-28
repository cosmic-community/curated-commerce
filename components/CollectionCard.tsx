import Link from 'next/link'
import type { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { name, description, cover_image } = collection.metadata

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative block rounded-2xl overflow-hidden aspect-[16/9] bg-gray-900"
    >
      {cover_image ? (
        <img
          src={`${cover_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
          alt={name}
          width={600}
          height={338}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-200 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-300 line-clamp-2 max-w-md">
            {description}
          </p>
        )}
        <div className="mt-4 inline-flex items-center text-sm text-white font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Browse collection
          <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}