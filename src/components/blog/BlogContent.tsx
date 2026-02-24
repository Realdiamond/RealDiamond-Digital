"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Clock, Search } from "lucide-react";
import { calculateReadTime } from '@/lib/readtime';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any[];
  category: string;
  author: string;
  publishedDate: string;
  image?: string;
}

interface Category {
  _id: string;
  title: string;
  slug: string;
}

interface BlogContentProps {
  posts: BlogPost[];
  categories: Category[];
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="py-8 bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles by title, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-secondary/30 border-y border-border/50">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-glow"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-accent/50"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.title)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.title
                    ? "bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-glow"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-accent/50"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {searchQuery !== "" 
                  ? `No posts found matching "${searchQuery}". Try a different search term.`
                  : selectedCategory === "all" 
                    ? "No blog posts yet. Check back soon!"
                    : `No posts found in "${selectedCategory}" category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post._id}
                  className="glass-card-hover overflow-hidden group"
                >
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
                          {calculateReadTime(post.content)}
                        </span>
                      </div>
                      <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
