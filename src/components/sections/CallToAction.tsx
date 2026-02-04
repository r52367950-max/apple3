'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';

export function CallToAction() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section bg-neutral-900 text-white overflow-hidden">
      <div ref={ref} className="container-narrow text-center relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sumire-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {/* Headline */}
          <h2 className="text-headline font-semibold">
            开始你的书写之旅
          </h2>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-lg mx-auto">
            找到那支属于你的笔。
            <br />
            让书写，重新成为一种享受。
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              href="/products"
              className="bg-white text-neutral-900 hover:bg-neutral-100"
              size="lg"
            >
              探索全系列
            </Button>
            <Button
              href="/compare"
              className="border-white/30 text-white hover:bg-white/10"
              variant="secondary"
              size="lg"
            >
              比较产品
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Pen Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 h-0.5 bg-gradient-to-r from-transparent via-sumire-500 to-transparent origin-center"
        />
      </div>
    </section>
  );
}

// Brand Philosophy Section
export function BrandPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section bg-sumire-50">
      <div ref={ref} className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Quote Mark */}
          <div className="text-6xl md:text-8xl text-sumire-200 font-serif leading-none mb-6">
            "
          </div>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-neutral-800 font-light leading-relaxed max-w-3xl mx-auto">
            真正动人的笔迹，从不喧哗。
          </blockquote>

          {/* Attribution */}
          <p className="mt-8 text-sm text-neutral-500">
            — Sumire 设计理念
          </p>
        </motion.div>
      </div>
    </section>
  );
}
