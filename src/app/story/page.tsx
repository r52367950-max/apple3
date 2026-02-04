'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { BRAND, PRODUCT_STORY } from '@/lib/constants';

function ParallaxSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function StoryBlock({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 md:py-32"
    >
      <div className="container-narrow">
        <span className="inline-block text-xs font-medium text-sumire-500 tracking-wider uppercase mb-6">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-8">
          {title}
        </h3>
        <div className="max-w-2xl">
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sumire-50 via-white to-white" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container-narrow text-center py-24 md:py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Brand Symbol */}
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sumire-100 to-sumire-200">
              <span className="text-3xl text-sumire-600">菫</span>
            </div>

            <h1 className="text-hero font-semibold text-neutral-900">
              品牌故事
            </h1>
            <p className="mt-6 text-subheadline text-neutral-600 max-w-2xl mx-auto">
              {BRAND.tagline}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-neutral-400"
          >
            <span className="text-xs tracking-wider">向下滚动</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Origin */}
      <section className="section bg-white">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-headline font-semibold text-neutral-900">
              名字的由来
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-6">
              Sumire 源自日语「菫」——紫罗兰。
            </p>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-6">
              这种花从不张扬。它生长在墙角、石缝、小径旁边，低矮而安静。
              但当你俯身靠近，会发现它的香气如此独特、如此令人难忘。
            </p>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-6">
              我们相信，书写也应该如此。
            </p>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              真正打动人的文字，不是用喧闹写成的。
              真正好用的工具，不会让你意识到它的存在。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="section bg-neutral-50">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-headline font-semibold text-neutral-900">
              设计理念
            </h2>
            <p className="mt-4 text-body-large text-neutral-600">
              三个坚持，定义我们的产品。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: '安静',
                description: '好的工具应该安静地退到幕后。我们追求的不是让人惊叹的设计，而是让人忘记设计这件事。',
              },
              {
                number: '02',
                title: '克制',
                description: '少即是多。我们不做多余的装饰，不加无用的功能。每一个细节都服务于书写本身。',
              },
              {
                number: '03',
                title: '长久',
                description: '我们不追求一时的新鲜感。Sumire 是一支你可以用很久、越用越顺手的笔。',
              },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-8"
              >
                <span className="text-4xl font-light text-sumire-300">{item.number}</span>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-neutral-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Story Sections */}
      <section className="bg-white">
        {PRODUCT_STORY.sections.map((section, index) => (
          <StoryBlock
            key={section.id}
            title={section.title}
            content={section.content}
            index={index}
          />
        ))}
      </section>

      {/* Quote Section */}
      <section className="section bg-sumire-50">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-6xl md:text-8xl text-sumire-200 font-serif leading-none mb-6">
              "
            </div>
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-neutral-800 font-light leading-relaxed max-w-3xl mx-auto">
              我们不做最醒目的笔。
              <br />
              我们做那支你用了很久之后，
              <br />
              才发现离不开的笔。
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-neutral-900 text-white">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold">
              开始书写
            </h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-lg mx-auto">
              探索 Sumire 全系列产品，找到属于你的那一支。
            </p>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-colors"
              >
                探索全系列
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
