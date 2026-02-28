import type { Metadata } from 'next'
import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'

export const metadata: Metadata = {
  title: 'Collections | Curated Commerce',
  description: 'Browse our curated product collections.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Collections</h1>
        <p className="mt-2 text-gray-500 text-lg">
          Browse our curated product groups
        </p>
      </div>

      {collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No collections available at the moment.</p>
        </div>
      )}
    </div>
  )
}