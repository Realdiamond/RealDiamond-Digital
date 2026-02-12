import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  canonical?: string;
  noindex?: boolean;
}

const siteConfig = {
  name: 'RealDiamond Digital',
  description: 'Strategic web design, development, SEO, and digital marketing that transforms your business. From strategy to execution, we deliver measurable growth.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://realdiamond-digital.vercel.app',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/realdiamonddigital',
    linkedin: 'https://linkedin.com/company/realdiamonddigital',
  },
};

export function generateSEO({
  title,
  description = siteConfig.description,
  keywords = [],
  ogImage = siteConfig.ogImage,
  ogType = 'website',
  article,
  canonical,
  noindex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Strategic Web Design & Development That Grows Revenue`;

  const defaultKeywords = [
    'web design',
    'web development',
    'SEO',
    'digital marketing',
    'Next.js',
    'custom websites',
    'ecommerce solutions',
    'SaaS marketing',
    'brand development',
    'website optimization',
  ];

  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    ...(canonical && { alternates: { canonical } }),
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(article && ogType === 'article' && {
        article: {
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: article.author ? [article.author] : undefined,
          tags: article.tags,
        },
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`],
      creator: '@realdiamonddigital',
    },
    other: {
      'og:phone_number': '+2348138462476',
      'og:email': 'realdiamonddigital@gmail.com',
      'og:availability': 'Worldwide',
      'og:service-area': 'Global',
    },
  };
}

export { siteConfig };
