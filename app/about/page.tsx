import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageBySlug, getCollections } from '@/lib/cosmic'
import type { Collection } from '@/types'
import CollectionCard from '@/components/CollectionCard'

export const metadata: Metadata = {
  title: 'About Us | Curated Commerce',
  description: 'Learn about our mission to bring you thoughtfully curated, beautifully crafted products from artisan makers.',
}

export default async function AboutPage() {
  const [page, collections] = await Promise.all([
    getPageBySlug('about'),
    getCollections(),
  ])

  // Fallback content if the page object doesn't exist yet
  const heading = page?.metadata?.heading ?? 'About Curated Commerce'
  const subtitle = page?.metadata?.subtitle ?? 'Thoughtfully curated, beautifully crafted.'
  const content = page?.metadata?.content ?? ''
  const heroImage = page?.metadata?.hero_image

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        {heroImage && (
          <div className="absolute inset-0 opacity-25">
            <img
              src={`${heroImage.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
              alt=""
              className="w-full h-full object-cover"
              width={1920}
              height={600}
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">
            {heading}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {content ? (
          <div className="prose max-w-none">
            {content.split('\n').map((paragraph: string, index: number) => {
              const trimmed = paragraph.trim()
              if (!trimmed) return null

              // Handle markdown headings
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">
                    {trimmed.replace('## ', '')}
                  </h2>
                )
              }

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-3">
                    {trimmed.replace('### ', '')}
                  </h3>
                )
              }

              // Handle list items
              if (trimmed.startsWith('- ')) {
                return (
                  <div key={index} className="flex items-start gap-3 my-2">
                    <span className="text-brand-600 mt-1.5 flex-shrink-0">•</span>
                    <p className="text-gray-600 leading-relaxed">{trimmed.replace('- ', '')}</p>
                  </div>
                )
              }

              // Regular paragraphs - handle bold text
              const parts = trimmed.split(/(\*\*[^*]+\*\*)/g)
              return (
                <p key={index} className="text-gray-600 leading-relaxed my-4 text-lg">
                  {parts.map((part: string, partIndex: number) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong key={partIndex} className="font-semibold text-gray-900">
                          {part.slice(2, -2)}
                        </strong>
                      )
                    }
                    return <span key={partIndex}>{part}</span>
                  })}
                </p>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Page content is coming soon. Add content in your Cosmic dashboard.
            </p>
          </div>
        )}
      </section>

      {/* Values Section */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Shop With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Curated Quality</h3>
              <p className="text-gray-500 leading-relaxed">
                Every product is handpicked for exceptional craftsmanship and timeless design.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Artisan Made</h3>
              <p className="text-gray-500 leading-relaxed">
                We partner with skilled makers who pour heart and soul into every piece.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Reviews</h3>
              <p className="text-gray-500 leading-relaxed">
                Real feedback from verified customers helps you shop with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections CTA */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Explore Our Collections</h2>
              <p className="mt-2 text-gray-500 text-lg">Find something you love</p>
            </div>
            <Link
              href="/collections"
              className="hidden sm:inline-flex items-center text-brand-700 font-medium hover:text-brand-800 transition-colors"
            >
              View all
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection: Collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}