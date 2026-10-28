import { notFound } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { generateSEO } from '@/lib/seo';
import { calculateReadTime } from '@/lib/readtime';
import ShareButtons from '@/components/ShareButtons';
import { CMS_REVALIDATE, docTag, entryTag, listTag } from '@/lib/cms-cache';

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
      next: {
        revalidate: CMS_REVALIDATE.blog,
        tags: [docTag('blog'), entryTag('blog', slug)],
      }
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
    canonical: `https://realdiamonddigital.studio/blog/${slug}`,
  });
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "blog"] { "slug": slug.current }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.blog,
        tags: [docTag('blog'), listTag('blog')],
      }
    }
  );
  return posts.map((post: any) => ({ slug: post.slug }));
}

export const revalidate = 60;

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
      <section className="pt-10 pb-10 lg:pt-14">
        <div className="container-wide">
          <div className="max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              All articles
            </Link>
            {post.category && <p className="bp-label text-accent mb-5">{post.category}</p>}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.03em]">{post.title}</h1>
            <p className="bp-label mt-6 flex flex-wrap gap-x-4 gap-y-1 normal-case tracking-normal">
              <span>{post.author}</span>
              <span>
                {new Date(post.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span>{readTime}</span>
            </p>
          </div>
        </div>
      </section>

      {post.image && (
        <section className="pb-12">
          <div className="container-wide">
            <div className="max-w-5xl bp-panel p-2 sm:p-3">
              <img src={post.image} alt="" className="w-full aspect-video object-cover block" />
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8">
              <div className="prose prose-lg max-w-none text-foreground prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-accent prose-strong:text-foreground">
                <PortableText value={post.content} components={portableTextComponents} />
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <ShareButtons 
                  title={post.title}
                  url={`/blog/${slug}`}
                  description={post.excerpt || post.metaDescription || ''}
                />
              </div>

              <div className="mt-8 bp-panel p-6 flex items-start gap-4">
                <div className="w-14 h-14 bg-foreground text-background flex items-center justify-center shrink-0 font-mono text-sm">
                  {post.author.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="bp-label mt-1 mb-2">Founder · RealDiamond Digital</p>
                  <p className="text-muted-foreground leading-relaxed">
                    UI/UX designer and front-end developer. I design and build websites for non-profits, churches,
                    consultancies and small businesses, and write about what I learn along the way.
                  </p>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div className="bg-foreground text-background p-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-background/60 mb-3">Need help?</p>
                  <h2 className="text-xl font-semibold mb-2">Want a website that works this way?</h2>
                  <p className="text-background/75 leading-relaxed mb-5">
                    Tell me about your project and I&apos;ll reply within 24 hours.
                  </p>
                  <Button variant="accent" size="sm" className="w-full" asChild>
                    <Link href="/contact">
                      Get in touch
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
