'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-hero font-semibold text-neutral-900 mb-8">
              隐私政策
            </h1>

            <div className="prose prose-lg max-w-none text-neutral-600">
              <p className="text-lg leading-relaxed mb-8">
                最后更新日期：2024 年 1 月
              </p>

              <p className="mb-6">
                Sumire 重视您的隐私。本隐私政策说明我们如何收集、使用和保护您的个人信息。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                我们收集的信息
              </h2>
              <p className="mb-4">
                当您访问我们的网站或进行购买时，我们可能会收集以下信息：
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>姓名和联系信息（电子邮件、电话号码、收货地址）</li>
                <li>支付信息（由第三方支付处理商安全处理）</li>
                <li>浏览行为和偏好设置</li>
                <li>设备信息和 IP 地址</li>
              </ul>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                信息使用方式
              </h2>
              <p className="mb-4">
                我们使用收集的信息用于：
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>处理和配送您的订单</li>
                <li>提供客户支持服务</li>
                <li>发送订单状态更新</li>
                <li>改进我们的产品和服务</li>
                <li>发送营销通讯（仅在您同意的情况下）</li>
              </ul>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                信息保护
              </h2>
              <p className="mb-6">
                我们采取适当的技术和管理措施保护您的个人信息，防止未经授权的访问、披露或丢失。
                所有支付信息均通过加密传输处理。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                Cookie 使用
              </h2>
              <p className="mb-6">
                我们使用 Cookie 和类似技术来改善您的浏览体验、分析网站流量并个性化内容。
                您可以通过浏览器设置管理 Cookie 偏好。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                您的权利
              </h2>
              <p className="mb-4">
                根据适用的数据保护法律，您有权：
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>访问我们持有的您的个人信息</li>
                <li>要求更正或删除您的信息</li>
                <li>反对或限制某些类型的数据处理</li>
                <li>撤回您之前给予的同意</li>
              </ul>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                联系我们
              </h2>
              <p className="mb-6">
                如果您对本隐私政策有任何疑问，请联系我们：
                <br />
                电子邮件：privacy@sumire.com
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                政策更新
              </h2>
              <p>
                我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，
                重大变更时我们会通过电子邮件通知您。
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
