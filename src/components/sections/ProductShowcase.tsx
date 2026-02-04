'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';

function ProductCard({
  product,
  index,
  featured = false,
}: {
  product: typeof PRODUCTS[number];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${featured ? 'md:col-span-2' : ''}`}
    >
      <Link href={`/products/${product.id}`}>
        <div className={`
          relative overflow-hidden rounded-2xl md:rounded-3xl
          bg-gradient-to-br from-neutral-100 to-neutral-50
          transition-all duration-500
          group-hover:shadow-xl
          ${featured ? 'aspect-[2/1]' : 'aspect-[4/3]'}
        `}>
          {/* Product Image Area */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* Pen Placeholder */}
            <div
              className={`
                bg-gradient-to-r rounded-full transform transition-all duration-700
                group-hover:scale-105 group-hover:rotate-[-5deg]
                ${product.id === 'noir'
                  ? 'from-neutral-800 via-neutral-900 to-neutral-800 shadow-xl'
                  : product.id === 'mist'
                    ? 'from-neutral-200 via-neutral-100 to-neutral-200'
                    : product.id === 'pro'
                      ? 'from-neutral-500 via-neutral-600 to-neutral-500'
                      : 'from-neutral-400 via-neutral-500 to-neutral-400'
                }
                ${featured ? 'w-3/4 h-4' : 'w-2/3 h-3'}
              `}
              style={{
                boxShadow: product.id === 'noir' ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)',
              }}
            />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="mt-6 px-1">
          {/* Subtitle */}
          <p className="text-xs text-sumire-600 font-medium tracking-wide uppercase">
            {product.subtitle}
          </p>

          {/* Name */}
          <h3 className="mt-1 text-xl md:text-2xl font-semibold text-neutral-900 group-hover:text-sumire-600 transition-colors">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mt-2 text-sm md:text-base text-neutral-600">
            {product.tagline}
          </p>

          {/* Price */}
          <p className="mt-3 text-lg font-medium text-neutral-900">
            ¥{product.price}
          </p>

          {/* Colors */}
          <div className="mt-3 flex items-center gap-2">
            {product.colorHexes.map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-neutral-200"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="ml-1 text-xs text-neutral-400">
              {product.colors.length} 色可选
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="section">
      <div ref={containerRef} className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-headline font-semibold text-neutral-900">
            探索全系列
          </h2>
          <p className="mt-4 text-body-large text-neutral-600 max-w-2xl mx-auto">
            四种风格，一种标准。找到属于你的那一支。
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              featured={product.id === 'noir'}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-sumire-600 hover:text-sumire-700 font-medium transition-colors"
          >
            <span>比较全部产品</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
