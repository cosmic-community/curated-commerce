// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

// Changed: Generate metadata from the blog post content
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found | Curated Commerce' }
  }

  return {
    title: `${post.metadata.title || post.title} | Curated Commerce Blog`,
    description: post.metadata.subtitle || post.metadata.title || post.title,
  }
}

// Changed: Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = post.metadata.content ?? ''
  const tags = post.metadata.tags
    ? post.metadata.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
    : []

  return (
    <div>
      {/* Header Section */}
      <section className="bg-brand-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <svg className="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </Link>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {post.metadata.title || post.title}
          </h1>

          {/* Subtitle */}
          {post.metadata.subtitle && (
            <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl">
              {post.metadata.subtitle}
            </p>
          )}

          {/* Author */}
          {post.metadata.author && (
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-sm font-semibold text-white">
                {post.metadata.author.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-300">
                By {post.metadata.author}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {content ? (
          <div className="prose max-w-none">
            {content.split('\n').map((paragraph: string, index: number) => {
              const trimmed = paragraph.trim()
              if (!trimmed) return null

              // Horizontal rules
              if (trimmed === '---') {
                return <hr key={index} className="my-10 border-gray-200" />
              }

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
                const listContent = trimmed.replace('- ', '')
                return (
                  <div key={index} className="flex items-start gap-3 my-2">
                    <span className="text-brand-600 mt-1.5 flex-shrink-0">•</span>
                    <p className="text-gray-600 leading-relaxed">
                      <MarkdownInline text={listContent} />
                    </p>
                  </div>
                )
              }

              // Regular paragraphs - handle bold and italic text
              return (
                <p key={index} className="text-gray-600 leading-relaxed my-4 text-lg">
                  <MarkdownInline text={trimmed} />
                </p>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Post content is coming soon.
            </p>
          </div>
        )}

        {/* Footer / Back to blog */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-brand-700 font-medium hover:text-brand-800 transition-colors"
          >
            <svg className="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </section>
    </div>
  )
}

// Changed: Helper component to render inline markdown (bold and italic)
function MarkdownInline({ text }: { text: string }) {
  // Split on bold markers (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part: string, partIndex: number) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIndex} className="font-semibold text-gray-900">
              {part.slice(2, -2)}
            </strong>
          )
        }
        // Handle italic (*text*)
        const italicParts = part.split(/(\*[^*]+\*)/g)
        return italicParts.map((iPart: string, iIndex: number) => {
          if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length > 2) {
            return (
              <em key={`${partIndex}-${iIndex}`} className="italic">
                {iPart.slice(1, -1)}
              </em>
            )
          }
          return <span key={`${partIndex}-${iIndex}`}>{iPart}</span>
        })
      })}
    </>
  )
}