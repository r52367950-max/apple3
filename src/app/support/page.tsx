'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FAQ } from '@/lib/constants';

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-neutral-100"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-base md:text-lg font-medium text-neutral-900 pr-8 group-hover:text-sumire-600 transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-neutral-400"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-600 leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactCard({
  icon,
  title,
  description,
  action,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  actionLabel: string;
}) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-neutral-100 hover:border-sumire-200 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-sumire-50 flex items-center justify-center text-sumire-600 mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 mb-4">{description}</p>
      <a
        href={action}
        className="inline-flex items-center text-sm text-sumire-600 font-medium hover:underline"
      >
        {actionLabel}
        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              支持
            </h1>
            <p className="mt-6 text-subheadline text-neutral-600 max-w-2xl mx-auto">
              我们随时准备为您解答。
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section pt-0">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h2 className="text-headline font-semibold text-neutral-900">
              常见问题
            </h2>
            <p className="mt-4 text-body-large text-neutral-600">
              在这里找到最常见问题的答案。
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl border border-neutral-100 px-6 md:px-8">
            {FAQ.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section id="warranty" className="section bg-neutral-50">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold text-neutral-900 mb-8">
              保修政策
            </h2>

            <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">保修期限</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    所有 Sumire 产品均享受自购买之日起一年的品质保障。Sumire Noir 系列享受两年延长保修。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">保修范围</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    保修涵盖因材质或工艺问题导致的产品故障，包括笔尖损坏、按动机构失灵、墨水泄漏等。我们将免费为您维修或更换产品。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">不在保修范围</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    以下情况不在保修范围内：人为损坏、改装、使用非官方墨芯造成的问题、正常磨损。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">如何申请保修</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    请联系我们的客服团队，提供购买凭证和产品照片。我们将在 2 个工作日内回复您的申请。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shipping Section */}
      <section id="shipping" className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline font-semibold text-neutral-900 mb-8">
              配送说明
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-neutral-100 p-8">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">配送时效</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sumire-500 mt-2 flex-shrink-0" />
                    <span>标准配送：3-5 个工作日</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sumire-500 mt-2 flex-shrink-0" />
                    <span>加急配送：1-2 个工作日（需额外付费）</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sumire-500 mt-2 flex-shrink-0" />
                    <span>偏远地区可能需要额外 1-3 个工作日</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-100 p-8">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">配送费用</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sumire-500 mt-2 flex-shrink-0" />
                    <span>订单满 ¥99 免运费</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sumire-500 mt-2 flex-shrink-0" />
                    <span>标准配送：¥10</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sumire-500 mt-2 flex-shrink-0" />
                    <span>加急配送：¥20</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-neutral-50">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-headline font-semibold text-neutral-900">
              联系我们
            </h2>
            <p className="mt-4 text-body-large text-neutral-600">
              有其他问题？我们随时为您服务。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
              title="电子邮件"
              description="工作日 1-2 天内回复"
              action="mailto:hello@sumire.com"
              actionLabel="hello@sumire.com"
            />

            <ContactCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              }
              title="在线客服"
              description="工作时间：周一至周五 9:00-18:00"
              action="#"
              actionLabel="开始对话"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
