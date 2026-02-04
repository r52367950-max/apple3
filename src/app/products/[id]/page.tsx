'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { PRODUCTS } from '@/lib/constants';

function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

function ColorSelector({
  colors,
  colorHexes,
  selected,
  onSelect,
}: {
  colors: readonly string[];
  colorHexes: readonly string[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {colors.map((color, index) => (
        <button
          key={color}
          onClick={() => onSelect(index)}
          className={`
            relative w-8 h-8 rounded-full transition-all duration-300
            ${selected === index ? 'ring-2 ring-offset-2 ring-sumire-500' : ''}
          `}
          style={{ backgroundColor: colorHexes[index] }}
          aria-label={color}
        >
          {selected === index && (
            <motion.div
              layoutId="colorIndicator"
              className="absolute inset-0 rounded-full border-2 border-white"
            />
          )}
        </button>
      ))}
      <span className="ml-2 text-sm text-neutral-500">{colors[selected]}</span>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-neutral-100">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="text-sm font-medium text-neutral-900">{value}</span>
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);

  const [selectedColor, setSelectedColor] = useState(0);
  const descRef = useRef<HTMLDivElement>(null);
  const isDescInView = useInView(descRef, { once: true, margin: '-100px' });

  if (!product) {
    notFound();
  }

  // Find adjacent products for navigation
  const currentIndex = PRODUCTS.findIndex((p) => p.id === id);
  const prevProduct = currentIndex > 0 ? PRODUCTS[currentIndex - 1] : null;
  const nextProduct = currentIndex < PRODUCTS.length - 1 ? PRODUCTS[currentIndex + 1] : null;

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="container-wide pt-6 pb-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400">
          <Link href="/products" className="hover:text-neutral-600 transition-colors">
            产品
          </Link>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="section pt-8 md:pt-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <motion.div
                    key={selectedColor}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`
                      w-full h-4 rounded-full transform rotate-[-15deg]
                      ${product.id === 'noir'
                        ? 'bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800'
                        : product.id === 'mist'
                          ? 'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200'
                          : product.id === 'pro'
                            ? 'bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-500'
                            : 'bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-400'
                      }
                    `}
                    style={{
                      boxShadow: product.id === 'noir' ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 50px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>
              </div>

              {/* Gallery Thumbnails Placeholder */}
              <div className="mt-4 flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-xl bg-neutral-100 flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
                  >
                    <div className="w-12 h-1 bg-neutral-300 rounded-full transform rotate-[-15deg]" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtitle */}
              <p className="text-sm text-sumire-600 font-medium tracking-wide uppercase">
                {product.subtitle}
              </p>

              {/* Name */}
              <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-neutral-900">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="mt-4 text-xl text-neutral-600">
                {product.tagline}
              </p>

              {/* Price */}
              <p className="mt-6 text-3xl font-semibold text-neutral-900">
                ¥{product.price}
              </p>

              {/* Color Selection */}
              <div className="mt-8">
                <p className="text-sm font-medium text-neutral-900 mb-3">颜色</p>
                <ColorSelector
                  colors={product.colors}
                  colorHexes={product.colorHexes}
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                />
              </div>

              {/* Features */}
              <div className="mt-8">
                <p className="text-sm font-medium text-neutral-900 mb-3">特性</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 bg-neutral-100 text-sm text-neutral-700 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-700 transition-colors">
                  加入购物车
                </button>
                <Link
                  href="/compare"
                  className="flex-1 px-8 py-4 border border-neutral-200 text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-colors text-center"
                >
                  比较产品
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section ref={descRef} className="section bg-neutral-50">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isDescInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold text-neutral-900 mb-8">
              关于 {product.name}
            </h2>
            <div className="prose prose-lg max-w-none">
              {product.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-lg text-neutral-600 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold text-neutral-900 mb-8">
              技术规格
            </h2>
            <div className="bg-white rounded-2xl border border-neutral-100 p-8">
              <SpecItem label="笔尖规格" value={product.specs.tipSize} />
              <SpecItem label="笔身重量" value={product.specs.weight} />
              <SpecItem label="笔身长度" value={product.specs.length} />
              <SpecItem label="笔身材质" value={product.specs.material} />
              <SpecItem label="书写续航" value={product.specs.inkCapacity} />
              <SpecItem label="墨水干燥时间" value={product.specs.dryTime} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Navigation */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevProduct && (
              <Link
                href={`/products/${prevProduct.id}`}
                className="group p-6 bg-white rounded-2xl border border-neutral-100 hover:border-sumire-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-sumire-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wide">上一款</p>
                    <p className="text-lg font-medium text-neutral-900 group-hover:text-sumire-600 transition-colors">
                      {prevProduct.name}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            {nextProduct && (
              <Link
                href={`/products/${nextProduct.id}`}
                className="group p-6 bg-white rounded-2xl border border-neutral-100 hover:border-sumire-200 transition-colors md:ml-auto"
              >
                <div className="flex items-center justify-end gap-4">
                  <div className="text-right">
                    <p className="text-xs text-neutral-400 uppercase tracking-wide">下一款</p>
                    <p className="text-lg font-medium text-neutral-900 group-hover:text-sumire-600 transition-colors">
                      {nextProduct.name}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-sumire-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
