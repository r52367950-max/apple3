import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { ProductStory } from '@/components/sections/ProductStory';
import { CallToAction, BrandPhilosophy } from '@/components/sections/CallToAction';

export default function HomePage() {
  return (
    <>
      {/* Hero - 书写的另一种可能 */}
      <Hero />

      {/* Features - 六大核心卖点 */}
      <Features />

      {/* Product Showcase - 产品展示 */}
      <ProductShowcase />

      {/* Brand Philosophy Quote */}
      <BrandPhilosophy />

      {/* Product Story - 设计背后的故事 */}
      <ProductStory />

      {/* CTA - 开始书写之旅 */}
      <CallToAction />
    </>
  );
}
