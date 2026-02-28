import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">Curated</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-xs">
              Thoughtfully curated, beautifully crafted products from artisan makers around the world.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/products" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              {/* Changed: Added Order Lookup link */}
              <li>
                <Link href="/orders" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Order Lookup
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Powered by Cosmic
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Curated Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}