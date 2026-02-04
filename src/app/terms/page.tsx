'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
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
              使用条款
            </h1>

            <div className="prose prose-lg max-w-none text-neutral-600">
              <p className="text-lg leading-relaxed mb-8">
                最后更新日期：2024 年 1 月
              </p>

              <p className="mb-6">
                欢迎访问 Sumire 网站。使用本网站即表示您同意遵守以下使用条款。
                请仔细阅读这些条款。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                网站使用
              </h2>
              <p className="mb-6">
                本网站仅供个人、非商业用途。您同意不会以任何可能损害、禁用或过度负担本网站的方式使用本网站，
                也不会干扰其他方使用本网站。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                知识产权
              </h2>
              <p className="mb-6">
                本网站上的所有内容，包括但不限于文本、图形、徽标、图像、音频剪辑和软件，
                均为 Sumire 或其内容提供商的财产，受国际版权法保护。
                未经我们书面许可，不得复制、分发或以其他方式使用这些内容。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                产品信息
              </h2>
              <p className="mb-6">
                我们努力确保本网站上显示的产品信息准确无误。
                但是，我们不保证产品描述、定价或其他内容的准确性、完整性或可靠性。
                如果我们发现错误，我们保留更正错误并取消相关订单的权利。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                订单与付款
              </h2>
              <p className="mb-4">
                提交订单即表示您同意：
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>提供真实、准确的购买信息</li>
                <li>支付订单总金额（包括适用的税费和运费）</li>
                <li>接受我们的退货和退款政策</li>
              </ul>
              <p className="mb-6">
                我们保留因任何原因拒绝或取消订单的权利。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                退货政策
              </h2>
              <p className="mb-6">
                如果您对购买的产品不满意，可以在收到商品后 30 天内申请退货。
                产品必须保持未使用状态并保留原包装。
                请联系我们的客服团队了解退货流程详情。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                责任限制
              </h2>
              <p className="mb-6">
                在法律允许的最大范围内，Sumire 不对因使用本网站或我们的产品而产生的任何间接、
                附带、特殊或后果性损害负责。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                外部链接
              </h2>
              <p className="mb-6">
                本网站可能包含指向第三方网站的链接。
                这些链接仅为方便起见，我们不对这些外部网站的内容或隐私做法负责。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                条款修改
              </h2>
              <p className="mb-6">
                我们保留随时修改这些使用条款的权利。
                修改后的条款将在本网站发布后立即生效。
                继续使用本网站即表示您接受修改后的条款。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                适用法律
              </h2>
              <p className="mb-6">
                这些使用条款受中华人民共和国法律管辖，
                由此产生的任何争议应提交至有管辖权的人民法院解决。
              </p>

              <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">
                联系方式
              </h2>
              <p>
                如果您对这些使用条款有任何疑问，请联系我们：
                <br />
                电子邮件：legal@sumire.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
