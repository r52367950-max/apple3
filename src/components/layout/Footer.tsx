'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRAND, FOOTER } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      {/* Main Footer */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-semibold tracking-tight text-neutral-900 hover:text-sumire-600 transition-colors"
            >
              {BRAND.name}
            </Link>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed max-w-xs">
              {BRAND.tagline}
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              安静地书写，专注地生活。
            </p>
          </div>

          {/* Link Columns */}
          {FOOTER.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
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

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">
              {FOOTER.copyright}
            </p>
            <div className="flex items-center gap-6">
              {FOOTER.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Newsletter Section (Optional)
export function NewsletterSection() {
  return (
    <section className="bg-sumire-50 py-16 md:py-24">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-headline font-semibold text-neutral-900">
            保持联系
          </h2>
          <p className="mt-4 text-body-large text-neutral-600 max-w-md mx-auto">
            订阅 Sumire 通讯，第一时间了解新品发布与书写灵感。
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="
                flex-1 px-5 py-3 rounded-full
                border border-neutral-200
                text-sm placeholder:text-neutral-400
                focus:outline-none focus:ring-2 focus:ring-sumire-500 focus:border-transparent
                transition-shadow
              "
            />
            <button
              type="submit"
              className="
                px-6 py-3 rounded-full
                bg-neutral-900 text-white text-sm font-medium
                hover:bg-neutral-700 transition-colors
              "
            >
              订阅
            </button>
          </form>
          <p className="mt-4 text-xs text-neutral-400">
            我们尊重您的隐私，不会分享您的信息。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
