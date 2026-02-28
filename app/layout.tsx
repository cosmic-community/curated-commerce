import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import CartDrawer from '@/components/CartDrawer'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Curated Commerce | Modern E-Commerce Store',
  description: 'Browse curated collections of handcrafted products with customer reviews and ratings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Changed: Wrapped app with CartProvider for cart state management */}
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </CartProvider>
      </body>
    </html>
  )
}