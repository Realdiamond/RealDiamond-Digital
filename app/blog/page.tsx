import Link from "next/link";
import Layout from "@/components/layout/Layout";
import CTA from "@/components/sections/CTA";
import { ArrowRight, Clock, User, Sparkles } from "lucide-react";
import { client } from "@/sanity/lib/client";

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
// Revalidate every 60 seconds - content updates within 1 minute
export const revalidate = 60;
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

      {/* Category Filter */}
      <section className="py-6 bg-secondary/30 border-y border-border/50">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-glow"
            >
              All
            </button>
            {categories.map((category: any) => (
              <button
                key={category._id}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 glass-card text-muted-foreground hover:text-foreground hover:border-accent/50"
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post: any) => (
                <article
                  key={post._id}
                  className="glass-card-hover overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <h2 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author.split(" ")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More */}
          {blogPosts.length > 10 && (
            <div className="mt-12 flex justify-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    page === 1
                      ? "bg-accent text-white"
                      : "glass-card text-muted-foreground hover:text-foreground hover:border-accent/50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA 
        title="Have Questions About Your Digital Strategy?"
        description="We're happy to help. Schedule a free consultation to discuss your specific situation."
        buttonText="Schedule a Call"
      />
    </Layout>
  );
}
