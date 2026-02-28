import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Curated Commerce',
  description: 'Get in touch with us. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto">
            Have a question about our products or want to learn more? Drop us a message and we&apos;ll get back to you as soon as we can.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-brand-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-500 mt-1">tony@cosmicjs.com</p>
          </div>

          <div className="text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-brand-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">Response Time</p>
            <p className="text-sm text-gray-500 mt-1">Within 24 hours</p>
          </div>

          <div className="text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-brand-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">Location</p>
            <p className="text-sm text-gray-500 mt-1">Worldwide</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}