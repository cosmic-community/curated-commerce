# Curated Commerce

![Curated Commerce](https://imgix.cosmicjs.com/9152e2a0-1455-11f1-9559-f51d6633c622-photo-1441986300917-64674bd600d8-1772249316305.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern e-commerce storefront built with Next.js 16 and Cosmic. Browse curated product collections, view detailed product pages with markdown descriptions, and read verified customer reviews — all powered by headless CMS content.

## Features

- 🛍️ **Product Catalog** — Browse all products with images, pricing, and availability
- 📦 **Curated Collections** — Products organized into themed collections with hero banners
- ⭐ **Customer Reviews** — Star ratings, verified purchase badges, and detailed review text
- 🔗 **Connected Content** — Products linked to collections and reviews via Cosmic object relationships
- 📱 **Fully Responsive** — Beautiful on desktop, tablet, and mobile
- ⚡ **Server-Side Rendered** — Fast page loads with Next.js 16 App Router
- 🎨 **Modern Design** — Clean, editorial aesthetic with smooth hover animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a25dd8b802e1e1dd161c6d&clone_repository=69a26227f0388f8c425ae02d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for 'Design a content model for an e-commerce store with products, collections, and customer reviews', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with products, collections, and reviews content

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd curated-commerce

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Products with Collection Data

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product

```typescript
const { objects: reviews } = await cosmic.objects
  .find({
    type: 'reviews',
    'metadata.product': productId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

| Object Type | Fields | Purpose |
|---|---|---|
| **Collections** | name, description, cover_image | Product groupings with hero images |
| **Products** | name, description, price, sku, image, available, collection | Product catalog items |
| **Reviews** | product, reviewer_name, rating, review, verified_purchase | Customer feedback |

Products link to Collections via object metafields. Reviews link to Products via object metafields. Using `depth=1` in queries automatically resolves these relationships.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->