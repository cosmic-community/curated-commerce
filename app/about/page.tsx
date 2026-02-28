import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageBySlug, getCollections, getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata: Metadata = {
  title: 'About Us | Curated Commerce',
  description: 'Learn about our mission to bring you thoughtfully curated, beautifully crafted products from artisan makers.',
}

export default async function AboutPage() {
  const [page, collections, reviews] = await Promise.all([
    getPageBySlug('about'),
    getCollections(),
    getReviews(),
  ])

  // Fallback content if page not yet created in Cosmic
  const heading = page?.metadata?.heading ?? 'About Curated Commerce'
  const subheading = page?.metadata?.subheading ?? 'Thoughtfully curated, beautifully crafted.'
  const content = page?.metadata?.content ?? ''
  const heroImage = page?.metadata?.hero_image

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        {heroImage && (
          <div className="absolute inset-0 opacity-20">
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
            {subheading}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          {content ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p>
                At Curated Commerce, we believe that everyday objects should be extraordinary. 
                We partner with skilled artisans and independent makers from around the world to bring you 
                products that are crafted with care, built to last, and designed to bring joy.
              </p>
              <h2>Our Mission</h2>
              <p>
                We started with a simple idea: make it easy to discover beautifully made products 
                without the noise. Every item in our store is hand-selected by our team for its quality, 
                craftsmanship, and timeless design.
              </p>
              <h2>What We Look For</h2>
              <ul>
                <li><strong>Quality Materials</strong> — We prioritize natural, sustainable, and premium materials that stand the test of time.</li>
                <li><strong>Expert Craftsmanship</strong> — Each product reflects the skill and passion of its maker.</li>
                <li><strong>Timeless Design</strong> — We favor classic aesthetics over fleeting trends.</li>
                <li><strong>Honest Pricing</strong> — Fair prices that reflect the true value of handcrafted goods.</li>
              </ul>
              <h2>Our Promise</h2>
              <p>
                When you shop with us, you&apos;re not just buying a product — you&apos;re supporting independent 
                makers and investing in things that are made to be cherished. We stand behind every item 
                we sell and are always here to help.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Collections Highlight */}
      {collections.length > 0 && (
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Explore Our Collections</h2>
              <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
                Every collection is thoughtfully assembled to help you discover products you&apos;ll love.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[16/9]"
                >
                  {collection.metadata.cover_image && (
                    <img
                      src={`${collection.metadata.cover_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                      alt={collection.metadata.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={800}
                      height={450}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">{collection.metadata.name}</h3>
                    <p className="mt-1 text-sm text-gray-200 line-clamp-2">{collection.metadata.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loved by Our Customers</h2>
            <p className="mt-3 text-gray-500 text-lg">
              Don&apos;t just take our word for it — hear from the people who shop with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Discover Something Special?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Browse our full collection of handpicked products and find your next favorite thing.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Shop All Products
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Simple markdown to HTML converter for Cosmic markdown content
function formatMarkdown(markdown: string): string {
  return markdown
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hulo])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
}