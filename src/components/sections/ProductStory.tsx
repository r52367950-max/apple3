'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PRODUCT_STORY } from '@/lib/constants';

function StorySection({
  section,
  index,
}: {
  section: typeof PRODUCT_STORY.sections[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-24 md:py-32"
    >
      <div className={`
        container-narrow
        grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center
        ${isEven ? '' : 'md:direction-rtl'}
      `}>
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`${!isEven ? 'md:direction-ltr' : ''}`}
        >
          {/* Section Number */}
          <span className="inline-block text-xs font-medium text-sumire-500 tracking-wider uppercase mb-4">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-6">
            {section.title}
          </h3>

          {/* Content */}
          <div className="space-y-4">
            {section.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-base md:text-lg text-neutral-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`${!isEven ? 'md:direction-ltr' : ''}`}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-sumire-50 to-sumire-100">
            {/* Abstract Visual based on section */}
            <div className="absolute inset-0 flex items-center justify-center">
              {section.id === 'question' && (
                <div className="text-6xl md:text-8xl font-light text-sumire-300">?</div>
              )}
              {section.id === 'nib' && (
                <div className="w-1 h-32 bg-gradient-to-b from-sumire-400 to-transparent rounded-full" />
              )}
              {section.id === 'ink' && (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sumire-400 to-sumire-600 opacity-80 blur-sm" />
              )}
              {section.id === 'weight' && (
                <div className="flex items-end gap-2">
                  {[0.4, 0.6, 1, 0.6, 0.4].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 bg-sumire-300 rounded-full"
                      style={{ height: `${h * 80}px` }}
                    />
                  ))}
                </div>
              )}
              {section.id === 'for-whom' && (
                <svg className="w-24 h-24 text-sumire-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              )}
            </div>

            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Background Element */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-sumire-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-sumire-50 rounded-full blur-3xl opacity-50" />
      </motion.div>

      {/* Section Header */}
      <div className="section pb-0">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold text-neutral-900">
              设计背后的故事
            </h2>
            <p className="mt-4 text-body-large text-neutral-600 max-w-2xl mx-auto">
              一支安静的笔，是如何诞生的。
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Sections */}
      <div className="relative z-10">
        {PRODUCT_STORY.sections.map((section, index) => (
          <StorySection key={section.id} section={section} index={index} />
        ))}
      </div>
    </section>
  );
}
