import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import CTA from "@/components/sections/CTA";
import { client } from "@/sanity/lib/client";
import BlogContent from "@/components/blog/BlogContent";
import { generateSEO } from '@/lib/seo';
import { CMS_REVALIDATE, docTag, listTag } from '@/lib/cms-cache';

export const metadata = generateSEO({
  title: 'Blog',
  description: 'Expert insights on web development, SEO, digital marketing, and business growth strategies. Practical tips and tutorials to help your business succeed online.',
  keywords: ['web development blog', 'SEO tips', 'digital marketing insights', 'business growth', 'WordPress tutorials', 'Next.js guides'],
  canonical: 'https://realdiamonddigital.studio/blog',
});

async function getBlogPosts() {
  const posts = await client.fetch(
    `*[_type == "blog"] | order(publishedDate desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      "category": category->title,
      author,
      publishedDate,
      "image": image.asset->url,
      featured
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.blog,
        tags: [docTag('blog'), listTag('blog')],
      }
    }
  );
  return posts;
}

async function getCategories() {
  const categories = await client.fetch(
    `*[_type == "category"] | order(coalesce(order, 999) asc) {
      _id,
      title,
      "slug": slug.current
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.blog,
        tags: [docTag('category'), listTag('category')],
      }
    }
  );
  return categories;
}

export const revalidate = 60;

export default async function Blog() {
  const blogPosts = await getBlogPosts();
  const categories = await getCategories();
  return (
    <Layout>
      <PageHeader
        eyebrow="Blog"
        title="Notes on design, development and SEO."
        description="Practical articles on web design, UI/UX, WordPress and SEO, written from real client projects."
      />

      <BlogContent posts={blogPosts} categories={categories} />

      <CTA
        title="Have a question about your website?"
        description="Send it over. I'm happy to help, and I reply to every enquiry within 24 hours."
        buttonText="Ask a question"
      />
    </Layout>
  );
}
