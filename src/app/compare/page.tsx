'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, COMPARISON } from '@/lib/constants';

function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[800px]">
        {/* Header */}
        <thead>
          <tr>
            <th className="py-6 px-4 text-left text-sm font-medium text-neutral-500 border-b border-neutral-200 w-48">
              {COMPARISON.headers[0]}
            </th>
            {PRODUCTS.map((product, index) => (
              <th
                key={product.id}
                className="py-6 px-4 text-center border-b border-neutral-200"
              >
                <Link href={`/products/${product.id}`} className="group block">
                  {/* Product Preview */}
                  <div className="mb-3 mx-auto w-20 h-20 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                    <div
                      className={`
                        w-12 h-1.5 rounded-full transform rotate-[-15deg]
                        ${product.id === 'noir'
                          ? 'bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800'
                          : product.id === 'mist'
                            ? 'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200'
                            : product.id === 'pro'
                              ? 'bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-500'
                              : 'bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-400'
                        }
                      `}
                    />
                  </div>
                  <p className="text-xs text-sumire-600 font-medium uppercase tracking-wide">
                    {product.subtitle}
                  </p>
                  <p className="mt-1 text-base font-semibold text-neutral-900 group-hover:text-sumire-600 transition-colors">
                    {product.name}
                  </p>
                </Link>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {COMPARISON.rows.map((row, rowIndex) => (
            <motion.tr
              key={row.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: rowIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <td className="py-4 px-4 text-sm font-medium text-neutral-700 border-b border-neutral-100 group-hover:bg-neutral-50 transition-colors">
                {row.label}
              </td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className="py-4 px-4 text-center text-sm text-neutral-600 border-b border-neutral-100 group-hover:bg-neutral-50 transition-colors"
                >
                  {value}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function ProductQuickCard({ product }: { product: typeof PRODUCTS[number] }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="p-6 bg-white rounded-2xl border border-neutral-100 hover:border-sumire-200 hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center mb-4">
          <div
            className={`
              w-2/3 h-2 rounded-full transform rotate-[-15deg]
              ${product.id === 'noir'
                ? 'bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800'
                : product.id === 'mist'
                  ? 'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200'
                  : product.id === 'pro'
                    ? 'bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-500'
                    : 'bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-400'
              }
            `}
          />
        </div>

        {/* Info */}
        <p className="text-xs text-sumire-600 font-medium uppercase tracking-wide">
          {product.subtitle}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-neutral-900 group-hover:text-sumire-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          {product.tagline}
        </p>
        <p className="mt-3 text-lg font-medium text-neutral-900">
          ¥{product.price}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center text-sm text-sumire-600 font-medium">
          <span>了解更多</span>
          <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function ComparePage() {
  const [showCards, setShowCards] = useState(false);

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="section pb-16 md:pb-20">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-hero font-semibold text-neutral-900">
              比较产品
            </h1>
            <p className="mt-6 text-subheadline text-neutral-600 max-w-2xl mx-auto">
              细节决定差异。
              <br />
              找到最适合你书写习惯的那一支。
            </p>
          </motion.div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="container-wide pb-8">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowCards(false)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              !showCards ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            表格视图
          </button>
          <button
            onClick={() => setShowCards(true)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              showCards ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            卡片视图
          </button>
        </div>
      </section>

      {/* Comparison Content */}
      <section className="section pt-0">
        <div className="container-full">
          {!showCards ? (
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              <ComparisonTable />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductQuickCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="section bg-neutral-50">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold text-neutral-900">
              如何选择
            </h2>
            <p className="mt-4 text-body-large text-neutral-600 max-w-2xl mx-auto">
              不同的笔，适合不同的书写者。
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-white rounded-xl border border-neutral-100">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">日常书写</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  如果你需要一支可靠的日常用笔，Sumire Original 是最佳选择。经典设计，精准书写。
                </p>
                <Link href="/products/original" className="text-sm text-sumire-600 font-medium hover:underline">
                  了解 Original →
                </Link>
              </div>

              <div className="p-6 bg-white rounded-xl border border-neutral-100">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">追求触感</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  如果你注重握持手感，Sumire Mist 的磨砂质感会让你爱不释手。
                </p>
                <Link href="/products/mist" className="text-sm text-sumire-600 font-medium hover:underline">
                  了解 Mist →
                </Link>
              </div>

              <div className="p-6 bg-white rounded-xl border border-neutral-100">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">长时间写作</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  如果你经常需要长时间书写，Sumire Pro 的人体工学设计会减轻疲劳。
                </p>
                <Link href="/products/pro" className="text-sm text-sumire-600 font-medium hover:underline">
                  了解 Pro →
                </Link>
              </div>

              <div className="p-6 bg-white rounded-xl border border-neutral-100">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">追求极致</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  如果你追求极致的书写体验，Sumire Noir 旗舰系列将满足你的所有期待。
                </p>
                <Link href="/products/noir" className="text-sm text-sumire-600 font-medium hover:underline">
                  了解 Noir →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
