// components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Fresh Fruit', href: '/shop?category=fruit' },
      { label: 'Vegetables', href: '/shop?category=vegetable' },
      { label: 'Kitchen Gear', href: '/shop?category=gadget' },
      { label: 'Supplements', href: '/shop?category=supplement' },
      { label: 'All Products', href: '/shop' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Recipes', href: '/blog?tag=recipes' },
      { label: 'Nutrition Guide', href: '/blog?tag=nutrition' },
      { label: 'Farm Stories', href: '/blog?tag=farms' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Delivery Areas', href: '/delivery' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

interface SocialLink {
  label: string
  href: string
  icon: ReactNode
}

const socialLinks: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-green-950 text-green-100">

      {/* ── NEWSLETTER BANNER ── */}
      <div className="border-b border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Get the freshest deals 🥬</h3>
              <p className="text-green-400 text-sm mt-1">
                Weekly seasonal boxes, recipes and Cape Town delivery updates.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-72 bg-green-900 border border-green-800 text-white placeholder:text-green-500 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:border-green-500 transition-colors"
              />
              <button type="button" className="btn-cta bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-6 py-2.5 rounded-full whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Veggie Stack logo" width={32} height={32} />
              <span className="text-lg font-bold text-white tracking-tight">
                Veggie<span className="text-green-400">Stack</span>
              </span>
            </Link>

            <p className="text-green-400 text-sm leading-relaxed mb-6 max-w-xs">
              Cape Town&apos;s plant-based delivery service. Fresh from Western Cape
              farms, straight to your kitchen — same day.
            </p>

            <ul className="space-y-2.5 mb-6">
              {[
                { icon: <MapPin size={15} />, text: 'Cape Town, Western Cape' },
                { icon: <Phone size={15} />, text: '+27 21 000 0000' },
                { icon: <Mail size={15} />, text: 'hello@veggiestack.co.za' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 text-sm text-green-400">
                  <span className="shrink-0 text-green-500">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-green-900 hover:bg-green-500 text-green-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-nudge text-sm text-green-400 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-500 text-xs">
            © {currentYear} VeggieStack (Pty) Ltd. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Refund Policy', href: '/refunds' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-green-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
