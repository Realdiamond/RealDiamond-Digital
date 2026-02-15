import { notFound } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Sparkles } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { generateSEO } from '@/lib/seo';
import { calculateReadTime } from '@/lib/readtime';
import ShareButtons from '@/components/ShareButtons';

async function getBlogPost(slug: string) {
  const post = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      "category": category->title,
      author,
      publishedDate,
      "image": image.asset->url,
      metaDescription,
      metaKeywords
    }`,
    { slug },
    {
      next: { revalidate: 60 } // 1 minute - blog posts update frequently
    }
  );
  return post;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {};
  }

  return generateSEO({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords || [post.category, 'blog', 'tutorial'],
    ogImage: post.image,
    ogType: 'article',
    article: {
      publishedTime: post.publishedDate,
      author: post.author,
      tags: [post.category],
    },
    canonical: `https://realdiamond-digital.vercel.app/blog/${slug}`,
  });
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "blog"] { "slug": slug.current }`,
    {},
    {
      next: { revalidate: 60 } // 1 minute
    }
  );
  return posts.map((post: any) => ({ slug: post.slug }));
}

// Time-based ISR (60s) + on-demand revalidation via webhook
export const revalidate = 60; // 1 minute - blog posts update frequently

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readTime = calculateReadTime(post.content);

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <img 
          src={value.asset.url} 
          alt={value.alt || ''} 
          className="rounded-lg my-8 w-full"
        />
      ),
      code: ({ value }: any) => (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-8">
          <code className={`language-${value.language}`}>{value.code}</code>
        </pre>
      ),
    },
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-heading font-bold mt-12 mb-6">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-heading font-semibold mt-8 mb-4">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-6 leading-relaxed">{children}</p>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
    },
    marks: {
      link: ({ children, value }: any) => (
        <a href={value.href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    },
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-15" />
          <div className="bg-orb bg-orb-2 opacity-10" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                {readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="pb-12 bg-background">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div className="prose prose-lg prose-invert max-w-none text-foreground prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-accent prose-strong:text-foreground">
                <PortableText value={post.content} components={portableTextComponents} />
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <ShareButtons 
                  title={post.title}
                  url={`/blog/${slug}`}
                  description={post.excerpt || post.metaDescription || ''}
                />
              </div>

              {/* Author Box */}
              <div className="mt-8 glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground font-heading font-bold text-xl">
                      {post.author.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{post.author}</h4>
                    <p className="text-sm text-accent mb-2">CEO & Lead Strategist at RealDiamond Digital</p>
                    <p className="text-sm text-muted-foreground">
                      With years of experience in digital strategy and web development, Oluwatimilehin helps 
                      businesses build effective digital presences that drive real results.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* CTA */}
                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/10" />
                  <div className="relative z-10">
                    <Sparkles className="w-8 h-8 text-accent mb-3" />
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Need Help With Your Website?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Let's discuss how we can help your business grow online.
                    </p>
                    <Button variant="accent" size="sm" className="w-full" asChild>
                      <Link href="/contact">
                        Get in Touch
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA 
        title="Ready to Build a Website That Works for Your Business?"
        description="Let's discuss how RealDiamond Digital can help you create a professional online presence."
      />
    </Layout>
  );
}
