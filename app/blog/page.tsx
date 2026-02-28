import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/cosmic'
import type { BlogPost } from '@/types'

export const metadata: Metadata = {
  title: 'Blog | Curated Commerce',
  description: 'Read our latest articles about intentional shopping, craftsmanship, and curated living.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Our Blog
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
            Stories about craftsmanship, intentional living, and the makers behind our curated products.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h2>
            <p className="text-gray-500">
              Blog posts will appear here once they&apos;re added in Cosmic.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

// Changed: Blog post card component for the listing page
function BlogPostCard({ post }: { post: BlogPost }) {
  const tags = post.metadata.tags
    ? post.metadata.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
    : []

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
    >
      {/* Decorative gradient header */}
      <div className="h-2 bg-gradient-to-r from-brand-600 to-brand-400" />

      <div className="p-6">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
          {post.metadata.title || post.title}
        </h2>

        {/* Subtitle */}
        {post.metadata.subtitle && (
          <p className="mt-2 text-gray-500 text-sm leading-relaxed line-clamp-2">
            {post.metadata.subtitle}
          </p>
        )}

        {/* Author & Read more */}
        <div className="mt-4 flex items-center justify-between">
          {post.metadata.author && (
            <span className="text-xs text-gray-400 font-medium">
              By {post.metadata.author}
            </span>
          )}
          <span className="inline-flex items-center text-sm font-medium text-brand-700 group-hover:text-brand-800 transition-colors">
            Read more
            <svg className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}