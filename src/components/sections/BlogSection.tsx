import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { calculateReadTime } from '@/lib/readtime';

async function getRecentPosts() {
  const posts = await client.fetch(
    `*[_type == "blog"] | order(publishedDate desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      "category": category->title,
      publishedDate,
      "image": image.asset->url
    }`,
    {},
    {
      next: { revalidate: 60 } // 1 minute - blog posts update frequently
    }
  );
  return posts;
}

export default async function BlogSection() {
  const posts = await getRecentPosts();

  if (!posts.length) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24" aria-labelledby="blog-title">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="bp-heading">
            <h2 id="blog-title" className="text-4xl md:text-5xl font-bold">
              Notes from the studio
            </h2>
            <span className="bp-note">latest articles</span>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog">
              All articles
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group bg-card flex flex-col">
              {post.image && (
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <p className="bp-label mb-4 flex flex-wrap gap-x-3 gap-y-1">
                  {post.category && <span className="text-accent">{post.category}</span>}
                  <span>
                    {new Date(post.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span>{calculateReadTime(post.content)}</span>
                </p>
                <h3 className="text-xl font-semibold leading-snug mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">{post.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-accent font-semibold text-sm">
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
