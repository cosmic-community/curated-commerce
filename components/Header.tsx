import Link from 'next/link'
import CartIcon from '@/components/CartIcon'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Curated</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
            >
              Products
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
            >
              About
            </Link>
            {/* Changed: Added cart icon to header */}
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  )
}