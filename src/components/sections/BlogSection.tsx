import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";

async function getRecentPosts() {
  const posts = await client.fetch(`
    *[_type == "blog"] | order(publishedDate desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "category": category->title,
      readTime,
      publishedDate,
      "image": image.asset->url
    }
  `);
  return posts;
}

export default async function BlogSection() {
  const posts = await getRecentPosts();

  return (
    <section className="py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb bg-orb-3 opacity-5" />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Latest from Our{" "}
            <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert insights, industry trends, and actionable tips to help you succeed online.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post: any, index: number) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group glass-card overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              {post.image && (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-accent-secondary/10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
