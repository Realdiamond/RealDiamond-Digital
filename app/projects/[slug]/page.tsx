import { notFound } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users, Calendar, CheckCircle2, Quote } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { generateSEO } from '@/lib/seo';

async function getProject(slug: string) {
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      description,
      "image": image.asset->url,
      tags,
      results,
      client,
      challenge,
      solution,
      strategy,
      services,
      testimonial,
      "gallery": gallery[].asset->url,
      duration,
      year,
      featured,
      order
    }`,
    { slug },
    {
      next: { revalidate: 900 } // 15 minutes - projects update occasionally
    }
  );
  return project;
}

async function getAdjacentProjects(currentSlug: string) {
  const allProjects = await client.fetch(
    `*[_type == "project"] | order(coalesce(order, 999) asc) {
      "slug": slug.current,
      title,
      "image": image.asset->url
    }`,
    {},
    {
      next: { revalidate: 900 } // 15 minutes
    }
  );
  
  const currentIndex = allProjects.findIndex((p: any) => p.slug === currentSlug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  
  return { nextProject, prevProject };
}

// Time-based ISR (60s) + on-demand revalidation via webhook
export const revalidate = 900; // 15 minutes - projects update occasionally

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return {};
  }

  const categoryMap: Record<string, string> = {
    web: 'Web Design',
    seo: 'SEO',
    branding: 'Branding',
    ecommerce: 'E-commerce',
  };

  const categoryName = categoryMap[project.category] || project.category;

  return generateSEO({
    title: `${project.title} - ${categoryName} Project`,
    description: project.description,
    keywords: [...(project.tags || []), categoryName, 'case study', 'portfolio'],
    ogImage: project.image,
    canonical: `https://realdiamond-digital.vercel.app/projects/${slug}`,
  });
}

export async function generateStaticParams() {
  const projects = await client.fetch(
    `*[_type == "project"] { "slug": slug.current }`,
    {},
    {
      next: { revalidate: 900 } // 15 minutes
    }
  );
  return projects.map((project: any) => ({ slug: project.slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const { nextProject, prevProject } = await getAdjacentProjects(slug);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
        </div>

        <div className="container-wide relative">

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <span className="px-3 py-1 glass-card text-xs font-medium text-accent mb-4 inline-block">
                {project.tags[0]}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{project.client.location}</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Industry</p>
                      <p className="text-sm font-medium text-foreground">{project.client.industry}</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">{project.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="text-sm font-medium text-foreground">{project.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-wrap gap-3">
                {project.results.map((result) => (
                  <span
                    key={result}
                    className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20"
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="glass-card overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 bg-secondary/30 border-t border-border/50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenge */}
            <div className="glass-card p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                The Challenge
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="glass-card p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Our Solution
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy & Services */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Strategy */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Our Strategy
              </h2>
              <div className="space-y-4">
                {project.strategy.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Used */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Services Provided
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="px-4 py-2 glass-card text-foreground font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 bg-secondary/30 border-t border-border/50">
          <div className="container-wide">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Project Gallery
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="glass-card overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-20 bg-background border-t border-border/50">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="w-12 h-12 text-accent/30 mx-auto mb-6" />
              <blockquote className="font-heading text-2xl md:text-3xl text-foreground mb-8 leading-relaxed">
                "{project.testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-medium text-foreground">{project.testimonial.author}</p>
                <p className="text-muted-foreground text-sm">{project.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Navigation */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container-wide">
          <div className="flex justify-between items-center">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-wide">Previous</p>
                <p className="font-medium">{prevProject.title}</p>
              </div>
            </Link>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide">Next</p>
                <p className="font-medium">{nextProject.title}</p>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background border-t border-border/50">
        <div className="container-wide">
          <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready for Similar <span className="text-gradient">Results?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Let's discuss how we can help your business achieve the same success.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
