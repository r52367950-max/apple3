'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="container-narrow text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 404 */}
          <h1 className="text-8xl md:text-9xl font-light text-sumire-200">
            404
          </h1>

          {/* Message */}
          <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-neutral-900">
            页面未找到
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-md mx-auto">
            抱歉，您访问的页面不存在。
            <br />
            也许它已经搬家，或者从未存在过。
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-700 transition-colors"
            >
              返回首页
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 border border-neutral-200 text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-colors"
            >
              浏览产品
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
