"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/client";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  image: any;
  results?: string[];
}

interface BentoPortfolioProps {
  projects: Project[];
}

const BentoPortfolio = ({ projects }: BentoPortfolioProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const featuredProjects = projects.slice(0, 4);
  
  // Category name mapping for full display
  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      web: 'Web Design',
      webdev: 'Web Development',
      seo: 'SEO',
      branding: 'Branding',
      ecommerce: 'E-commerce',
    };
    return categoryMap[category] || category;
  };
  
  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container-wide relative">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Featured Work</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Projects That{" "}
            <span className="text-gradient">Delivered</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real results for real businesses. See how we've helped service companies get more calls, bookings, and revenue.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 mb-12">
          {/* Large Featured - Spans 8 cols on lg, 4 on md */}
          <Link
            href={`/projects/${featuredProjects[0].slug.current}`}
            className="group relative md:col-span-4 lg:col-span-8 row-span-2 rounded-3xl overflow-hidden glass-card hover:shadow-elevated transition-all duration-500"
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-[500px] md:h-[600px]">
              {featuredProjects[0].image && urlFor(featuredProjects[0].image) && (
              <Image
                src={urlFor(featuredProjects[0].image)?.width(1200).height(800).url() || ''}
                alt={featuredProjects[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full uppercase">
                    {getCategoryName(featuredProjects[0].category)}
                  </span>
                  {featuredProjects[0].results.slice(0, 1).map((result) => (
                    <span key={result} className="px-3 py-1 bg-accent-secondary/20 text-accent-secondary text-xs font-semibold rounded-full">
                      {result}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
                  {featuredProjects[0].title}
                </h3>
                <p className="text-white/80 mb-4 line-clamp-2">
                  {featuredProjects[0].description}
                </p>
                <div className="flex items-center gap-2 text-accent font-semibold">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Medium - Top Right */}
          {featuredProjects[1] && (
          <Link
            href={`/projects/${featuredProjects[1].slug.current}`}
            className="group relative md:col-span-2 lg:col-span-4 rounded-3xl overflow-hidden glass-card hover:shadow-elevated transition-all duration-500"
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-[280px] md:h-[290px]">
              {featuredProjects[1].image && urlFor(featuredProjects[1].image) && (
              <Image
                src={urlFor(featuredProjects[1].image)?.width(600).height(400).url() || ''}
                alt={featuredProjects[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full uppercase mb-3">
                  {getCategoryName(featuredProjects[1].category)}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                  {featuredProjects[1].title}
                </h3>
                <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                  <span>View</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
          )}

          {/* Medium - Bottom Right */}
          {featuredProjects[2] && (
          <Link
            href={`/projects/${featuredProjects[2].slug.current}`}
            className="group relative md:col-span-2 lg:col-span-4 rounded-3xl overflow-hidden glass-card hover:shadow-elevated transition-all duration-500"
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-[280px] md:h-[290px]">
              {featuredProjects[2].image && urlFor(featuredProjects[2].image) && (
              <Image
                src={urlFor(featuredProjects[2].image)?.width(600).height(400).url() || ''}
                alt={featuredProjects[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full uppercase mb-3">
                  {getCategoryName(featuredProjects[2].category)}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                  {featuredProjects[2].title}
                </h3>
                <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                  <span>View</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
          )}

          {/* Full Width CTA Card */}
          <div className="md:col-span-6 lg:col-span-12 rounded-3xl overflow-hidden glass-card p-12 bg-gradient-to-br from-accent/5 via-accent-secondary/5 to-transparent border-2 border-accent/20 hover:border-accent/40 transition-all duration-500 group cursor-pointer">
            <div className="max-w-2xl">
              <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Want to see more? We've helped 50+ service businesses grow.
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                From HVAC companies to roofing contractors, see how we've driven real leads and revenue for businesses like yours.
              </p>
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-bold hover:shadow-glow transition-all group-hover:gap-4"
              >
                Browse All Projects
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoPortfolio;
