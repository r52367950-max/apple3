// ============================================
// Sumire Brand Constants
// 落笔之间，暗香浮动
// ============================================

export const BRAND = {
  name: 'Sumire',
  tagline: '落笔之间，暗香浮动。',
  description: 'Sumire 相信书写是一种安静的表达。我们打造内敛而精致的书写工具，让每一笔都如紫罗兰般——不事张扬，自有芬芳。',
} as const;

export const SEO = {
  title: 'Sumire | 落笔之间，暗香浮动',
  description: 'Sumire 相信书写是一种安静的表达。我们打造内敛而精致的书写工具，让每一笔都如紫罗兰般——不事张扬，自有芬芳。',
  keywords: '中性笔, 高端文具, Sumire, 书写体验, 设计文具, 精品中性笔',
} as const;

export const NAVIGATION = {
  main: [
    { label: '产品', href: '/products' },
    { label: '对比', href: '/compare' },
    { label: '故事', href: '/story' },
    { label: '支持', href: '/support' },
  ],
  products: [
    { label: 'Sumire Original', href: '/products/original' },
    { label: 'Sumire Mist', href: '/products/mist' },
    { label: 'Sumire Pro', href: '/products/pro' },
    { label: 'Sumire Noir', href: '/products/noir' },
  ],
} as const;

// Hero Content
export const HERO = {
  headline: '书写的另一种可能。',
  subheadline: 'Sumire 以近乎偏执的细节打磨，重新定义笔尖与纸张相遇的每一瞬间。',
  cta: {
    primary: '探索全系列',
    secondary: '了解 Sumire',
  },
} as const;

// Feature Grid - 6 Core Features
export const FEATURES = [
  {
    id: 'nib',
    title: '笔尖，0.5mm 的诗意',
    description: '瑞士精密切割工艺，落笔即顺滑。每一道笔画，锋利而不刻薄。',
    icon: 'nib',
  },
  {
    id: 'ink',
    title: '墨随意走',
    description: '自研低粘度速干墨水，书写时如呼吸般自然流淌，停笔后 0.3 秒即干。',
    icon: 'ink',
  },
  {
    id: 'weight',
    title: '恰到好处的重量',
    description: '12.8g 配重，轻握不飘，久写不倦。重心落于指尖正下方。',
    icon: 'weight',
  },
  {
    id: 'grip',
    title: '握感，是被记住的',
    description: '微蚀纹理笔握，触感温润。每一支笔都在手中找到自己的位置。',
    icon: 'grip',
  },
  {
    id: 'silent',
    title: '安静的细节',
    description: '按压无声，插拔无痕。连笔帽的咬合，都经过 17 次静音调校。',
    icon: 'silent',
  },
  {
    id: 'endurance',
    title: '书写 10 万字',
    description: '单支续航约 1200m，足够写完三本手稿，或一整年的日记。',
    icon: 'endurance',
  },
] as const;

// Product Lines
export const PRODUCTS = [
  {
    id: 'original',
    name: 'Sumire Original',
    subtitle: '经典之选',
    tagline: '一切从这里开始。',
    description: '经典设计，精准书写。Sumire Original 是我们对书写本质的回答——不多不少，恰到好处。',
    longDescription: `Sumire Original 是我们的起点，也是对书写本质的一次回归。

它没有多余的装饰，每一处细节都服务于一个目的：让书写变得自然。

0.5mm 瑞士精密笔尖，12.8g 精准配重，速干墨水。
这些，就是全部。`,
    price: 48,
    colors: ['深灰', '月白', '藤紫'],
    colorHexes: ['#4a4a4a', '#f5f5f5', '#9a87b8'],
    specs: {
      tipSize: '0.5mm',
      weight: '12.8g',
      length: '140mm',
      material: '铝合金 / 树脂',
      inkCapacity: '1200m',
      dryTime: '0.3s',
    },
    features: ['瑞士精密笔尖', '速干墨水', '铝合金笔身', '静音按动'],
    images: {
      hero: '/images/products/original-hero.jpg',
      gallery: [
        '/images/products/original-1.jpg',
        '/images/products/original-2.jpg',
        '/images/products/original-3.jpg',
      ],
    },
  },
  {
    id: 'mist',
    name: 'Sumire Mist',
    subtitle: '轻雾质感',
    tagline: '如晨雾般轻盈。',
    description: '磨砂质感笔身，轻盈手感。Sumire Mist 为追求细腻触感的书写者而生。',
    longDescription: `有些美，需要触碰才能感受。

Sumire Mist 的笔身采用精细喷砂工艺，形成独特的雾面质感。
指尖划过，如晨雾轻抚。

减轻至 11.2g，却依然保持书写的稳定感。
这是轻盈与平衡之间的对话。`,
    price: 58,
    colors: ['晨雾灰', '薄荷绿', '淡樱粉'],
    colorHexes: ['#e8e8e8', '#a8d5ba', '#f5d5d5'],
    specs: {
      tipSize: '0.5mm',
      weight: '11.2g',
      length: '138mm',
      material: '磨砂铝合金',
      inkCapacity: '1200m',
      dryTime: '0.3s',
    },
    features: ['喷砂雾面工艺', '轻量化设计', '柔和触感', '防指纹涂层'],
    images: {
      hero: '/images/products/mist-hero.jpg',
      gallery: [
        '/images/products/mist-1.jpg',
        '/images/products/mist-2.jpg',
        '/images/products/mist-3.jpg',
      ],
    },
  },
  {
    id: 'pro',
    name: 'Sumire Pro',
    subtitle: '长时间书写',
    tagline: '为马拉松式书写而生。',
    description: '符合人体工学的握持设计，专为长时间书写优化。Sumire Pro 是创作者的可靠伙伴。',
    longDescription: `真正的书写者，需要一支能够陪伴漫长创作的笔。

Sumire Pro 的握持区域经过人体工学优化，
接触面积增加 23%，压力分布更均匀。

配合我们全新调配的超润滑墨水，
即使书写数小时，手指依然从容。`,
    price: 78,
    colors: ['石墨灰', '深海蓝', '森林绿'],
    colorHexes: ['#3a3a3a', '#2a4a6a', '#2a4a3a'],
    specs: {
      tipSize: '0.5mm / 0.38mm',
      weight: '14.5g',
      length: '142mm',
      material: '航空铝合金 / 硅胶握位',
      inkCapacity: '1500m',
      dryTime: '0.25s',
    },
    features: ['人体工学握位', '双规格笔尖', '超大容量墨仓', '长时书写优化'],
    images: {
      hero: '/images/products/pro-hero.jpg',
      gallery: [
        '/images/products/pro-1.jpg',
        '/images/products/pro-2.jpg',
        '/images/products/pro-3.jpg',
      ],
    },
  },
  {
    id: 'noir',
    name: 'Sumire Noir',
    subtitle: '旗舰，极致黑',
    tagline: '黑色，是所有颜色的终点。',
    description: '旗舰之作。Sumire Noir 以纯粹的黑色美学，诠释书写的极致追求。',
    longDescription: `黑色不是缺席，而是一种态度。

Sumire Noir 是我们对极致的追求——
DLC 类钻碳镀膜，赋予笔身深邃的光泽与超凡的耐久度。

每一处金属部件，都经过 PVD 真空镀黑处理。
连笔夹的弹簧，都是特制的消光黑色。

这不只是一支笔。
这是对书写仪式感的最高致敬。`,
    price: 168,
    colors: ['极夜黑'],
    colorHexes: ['#1a1a1a'],
    specs: {
      tipSize: '0.5mm',
      weight: '18.6g',
      length: '145mm',
      material: 'DLC 镀膜钛合金',
      inkCapacity: '1200m',
      dryTime: '0.2s',
    },
    features: ['DLC 类钻镀膜', 'PVD 真空镀黑', '钛合金笔身', '限量编号'],
    images: {
      hero: '/images/products/noir-hero.jpg',
      gallery: [
        '/images/products/noir-1.jpg',
        '/images/products/noir-2.jpg',
        '/images/products/noir-3.jpg',
      ],
    },
  },
] as const;

// Product Story Sections
export const PRODUCT_STORY = {
  sections: [
    {
      id: 'question',
      title: '从一个问题开始',
      content: `我们问自己：一支笔可以安静到什么程度？

不是沉默——沉默是压抑。
我们追求的安静，是一种自然的消隐。

当你落笔时，笔应该消失。
只剩下你的思绪，和纸上的痕迹。`,
    },
    {
      id: 'nib',
      title: '笔尖之下',
      content: `Sumire 的笔尖采用瑞士精密切割工艺。

每一颗笔珠的球度误差，控制在 0.001mm 以内。
这意味着什么？意味着落笔的瞬间，纸张几乎感受不到阻力。

我们不追求"顺滑"这个词。
我们追求的是：让你忘记顺滑这件事。`,
    },
    {
      id: 'ink',
      title: '墨水的脾气',
      content: `我们用了 14 个月调配这款墨水。

太稀则晕染，太稠则滞涩。
速干太快，笔迹会显得生硬；太慢，又会蹭花前一行字。

最终的配方，在触纸后 0.3 秒完成干燥。
不早一刻，不晚一瞬。`,
    },
    {
      id: 'weight',
      title: '重量是一种语言',
      content: `太轻则飘，太重则累。

我们测试了从 8g 到 22g 的 47 种配重方案。
最终选定 12.8g——这是大多数人连续书写 2 小时后，依然感觉舒适的重量。

重心被刻意设置在握持位置正下方 3mm 处。
这让笔在手中自然下沉，形成稳定的书写姿态。`,
    },
    {
      id: 'for-whom',
      title: '为安静书写的人',
      content: `Sumire 不适合所有人。

如果你追求张扬、炫目、与众不同的外观，
这里没有你要找的东西。

但如果你相信——
真正的书写，是与自己的对话；
真正的工具，应该安静地退到幕后；

那么，欢迎你。`,
    },
  ],
} as const;

// Comparison Table Data
export const COMPARISON = {
  headers: ['规格', 'Original', 'Mist', 'Pro', 'Noir'],
  rows: [
    { label: '笔尖规格', values: ['0.5mm', '0.5mm', '0.5 / 0.38mm', '0.5mm'] },
    { label: '笔身重量', values: ['12.8g', '11.2g', '14.5g', '18.6g'] },
    { label: '笔身长度', values: ['140mm', '138mm', '142mm', '145mm'] },
    { label: '笔身材质', values: ['铝合金', '磨砂铝合金', '航空铝合金', 'DLC镀膜钛合金'] },
    { label: '书写续航', values: ['1200m', '1200m', '1500m', '1200m'] },
    { label: '墨水干燥', values: ['0.3s', '0.3s', '0.25s', '0.2s'] },
    { label: '握位设计', values: ['标准', '磨砂触感', '人体工学', '标准'] },
    { label: '特殊工艺', values: ['—', '喷砂雾面', '硅胶握位', 'PVD镀黑'] },
    { label: '建议零售价', values: ['¥48', '¥58', '¥78', '¥168'] },
  ],
} as const;

// FAQ Data
export const FAQ = [
  {
    question: 'Sumire 中性笔的墨水可以替换吗？',
    answer: '可以。所有 Sumire 产品均支持替换墨芯。我们提供官方替换芯（黑色 / 蓝色），也兼容市面上大多数 G2 规格的通用墨芯。为获得最佳书写体验，我们建议使用 Sumire 原装墨芯。',
  },
  {
    question: '笔尖有不同粗细可选吗？',
    answer: 'Sumire Original、Mist 和 Noir 均采用 0.5mm 笔尖。Sumire Pro 提供 0.5mm 和 0.38mm 两种规格可选。我们认为 0.5mm 是日常书写的最佳平衡点。',
  },
  {
    question: '产品提供保修吗？',
    answer: '所有 Sumire 产品均享受自购买之日起一年的品质保障。在保修期内，因材质或工艺问题导致的故障，我们将免费维修或更换。人为损坏不在保修范围内。',
  },
  {
    question: '如何清洁和保养我的 Sumire 笔？',
    answer: '日常使用后，用柔软的干布轻轻擦拭笔身即可。避免使用酒精或化学溶剂清洁。不使用时，请保持笔帽闭合，防止墨水干涸。Sumire Mist 的磨砂表面可用微湿的布轻拭。',
  },
  {
    question: '可以刻字定制吗？',
    answer: '目前 Sumire Noir 支持激光刻字服务。每支笔可刻制最多 15 个字符（含字母、数字和标点）。定制服务需额外付费，请联系客服了解详情。',
  },
  {
    question: '墨水会晕染或透背吗？',
    answer: 'Sumire 墨水经过专门调配，在大多数 80g 以上的纸张上不会出现晕染或透背现象。速干配方确保墨迹在 0.3 秒内干燥，减少蹭花的可能。但在极薄或吸墨性极强的纸张上，仍可能出现轻微渗透。',
  },
  {
    question: '国际配送服务有提供吗？',
    answer: '目前我们提供中国大陆地区的配送服务。港澳台及海外地区的配送服务正在筹备中。如有特殊需求，请联系我们的客服团队。',
  },
  {
    question: '如何联系客服？',
    answer: '您可以通过电子邮件 hello@sumire.com 联系我们。我们的客服团队将在 1-2 个工作日内回复您的咨询。',
  },
] as const;

// Footer Links
export const FOOTER = {
  sections: [
    {
      title: '产品',
      links: [
        { label: 'Sumire Original', href: '/products/original' },
        { label: 'Sumire Mist', href: '/products/mist' },
        { label: 'Sumire Pro', href: '/products/pro' },
        { label: 'Sumire Noir', href: '/products/noir' },
        { label: '产品对比', href: '/compare' },
      ],
    },
    {
      title: '关于',
      links: [
        { label: '品牌故事', href: '/story' },
        { label: '设计理念', href: '/story#philosophy' },
        { label: '联系我们', href: '/support#contact' },
      ],
    },
    {
      title: '支持',
      links: [
        { label: '常见问题', href: '/support' },
        { label: '保修政策', href: '/support#warranty' },
        { label: '配送说明', href: '/support#shipping' },
      ],
    },
  ],
  legal: [
    { label: '隐私政策', href: '/privacy' },
    { label: '使用条款', href: '/terms' },
  ],
  copyright: `© ${new Date().getFullYear()} Sumire. 保留所有权利。`,
} as const;

// Animation Variants for Framer Motion
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

// Transition Presets
export const TRANSITIONS = {
  smooth: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  slow: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
} as const;
