import Link from "next/link";
import Layout from "@/components/layout/Layout";
import CTA from "@/components/sections/CTA";
import { ArrowRight, Clock, User, Sparkles } from "lucide-react";
import { client } from "@/sanity/lib/client";
import BlogContent from "@/components/blog/BlogContent";

async function getBlogPosts() {
  const posts = await client.fetch(`
    *[_type == "blog"] | order(publishedDate desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "category": category->title,
      author,
      publishedDate,
      readTime,
      "image": image.asset->url,
      featured
    }
  `);
  return posts;
}

async function getCategories() {
  const categories = await client.fetch(`
    *[_type == "category"] | order(order asc) {
      _id,
      title,
      "slug": slug.current
    }
  `);
  return categories;
}

// Static with on-demand revalidation via webhook
export const revalidate = false;

export default async function Blog() {
  const blogPosts = await getBlogPosts();
  const categories = await getCategories();
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Our Blog</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Insights for{" "}
              <span className="text-gradient">Business Growth</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Practical insights on web development, SEO, WordPress, and digital strategy 
              to help your business succeed online.
            </p>
          </div>
        </div>
      </section>

      <BlogContent posts={blogPosts} categories={categories} />

      <CTA 
        title="Have Questions About Your Digital Strategy?"
        description="We're happy to help. Schedule a free consultation to discuss your specific situation."
        buttonText="Schedule a Call"
      />
    </Layout>
  );
}
