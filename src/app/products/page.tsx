'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';

function ProductCard({
  product,
  index,
}: {
  product: typeof PRODUCTS[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-50 transition-all duration-500 group-hover:shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div
              className={`
                w-2/3 h-3 bg-gradient-to-r rounded-full transform transition-all duration-700
                group-hover:scale-105 group-hover:rotate-[-5deg]
                ${product.id === 'noir'
                  ? 'from-neutral-800 via-neutral-900 to-neutral-800 shadow-xl'
                  : product.id === 'mist'
                    ? 'from-neutral-200 via-neutral-100 to-neutral-200'
                    : product.id === 'pro'
                      ? 'from-neutral-500 via-neutral-600 to-neutral-500'
                      : 'from-neutral-400 via-neutral-500 to-neutral-400'
                }
              `}
              style={{
                boxShadow: product.id === 'noir' ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)',
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Product Info */}
        <div className="mt-6 px-1">
          <p className="text-xs text-sumire-600 font-medium tracking-wide uppercase">
            {product.subtitle}
          </p>
          <h3 className="mt-1 text-xl md:text-2xl font-semibold text-neutral-900 group-hover:text-sumire-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm md:text-base text-neutral-600">
            {product.tagline}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-medium text-neutral-900">
              ¥{product.price}
            </p>
            <div className="flex items-center gap-2">
              {product.colorHexes.map((color, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-full border border-neutral-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
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
              全系列产品
            </h1>
            <p className="mt-6 text-subheadline text-neutral-600 max-w-2xl mx-auto">
              四款设计，一种标准。
              <br />
              每一支都为安静的书写者而生。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section pt-0">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Compare CTA */}
      <section className="section bg-neutral-50">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold text-neutral-900">
              不确定选哪一支？
            </h2>
            <p className="mt-4 text-body-large text-neutral-600">
              比较全系列产品的规格与特性，找到最适合你的那一支。
            </p>
            <div className="mt-8">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-700 transition-colors"
              >
                比较产品
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
