import { notFound } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import CTA from "@/components/sections/CTA";
import { getCaseStudy } from "@/data/portfolio";
import { client } from "@/sanity/lib/client";
import { generateSEO } from '@/lib/seo';
import { CMS_REVALIDATE, docTag, entryTag, listTag } from '@/lib/cms-cache';

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
      testimonial->{
        quote,
        author,
        role,
        company,
        rating
      },
      "gallery": gallery[].asset->url,
      duration,
      year,
      "projectUrl": select(liveSiteOffline == true => null, projectUrl),
      featured,
      order
    }`,
    { slug },
    {
      next: {
        revalidate: CMS_REVALIDATE.project,
        tags: [docTag('project'), entryTag('project', slug)],
      }
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
      next: {
        revalidate: CMS_REVALIDATE.project,
        tags: [docTag('project'), listTag('project')],
      }
    }
  );
  
  const currentIndex = allProjects.findIndex((p: any) => p.slug === currentSlug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  
  return { nextProject, prevProject };
}

export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  web: "Web Design",
  webdev: "Web Development",
  uiux: "UI/UX Design",
  seo: "SEO",
  branding: "Branding",
  ecommerce: "E-commerce",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return {};
  }

  const categoryName = categoryLabels[project.category] || project.category;

  return generateSEO({
    title: `${project.title} - ${categoryName} Project`,
    description: project.description,
    keywords: [...(project.tags || []), categoryName, 'case study', 'portfolio'],
    ogImage: project.image,
    canonical: `https://realdiamonddigital.studio/projects/${slug}`,
  });
}

export async function generateStaticParams() {
  const projects = await client.fetch(
    `*[_type == "project"] { "slug": slug.current }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.project,
        tags: [docTag('project'), listTag('project')],
      }
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
  const caseStudy = getCaseStudy(slug);

  const facts = [
    { label: "Client", value: project.client?.name },
    { label: "Industry", value: project.client?.industry },
    { label: "Location", value: project.client?.location },
    { label: "Timeline", value: project.duration },
    { label: "Year", value: project.year },
  ].filter((fact) => fact.value);

  return (
    <Layout>
      <section className="pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="container-wide">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </Link>

          <div className="max-w-4xl">
            <p className="bp-label mb-6">
              {categoryLabels[project.category] || project.category}
              {project.client?.industry ? ` · ${project.client.industry}` : ""}
            </p>
            <h1 className="text-[40px] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em]">{project.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mt-6 max-w-3xl">{project.description}</p>
          </div>

          {facts.length > 0 && (
            <dl className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border mt-10">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-card p-4 flex flex-col gap-1 [&:last-child:nth-child(odd)]:col-span-2 md:[&:last-child:nth-child(odd)]:col-span-1">
                  <dt className="bp-label">{fact.label}</dt>
                  <dd className="font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.image && (
            <div className="bp-panel p-2 sm:p-3 mt-8">
              <img src={`${project.image}?w=2000&auto=format`} alt={`${project.title} website`} className="w-full h-auto block" />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-6">
            {project.projectUrl && (
              <Button variant="accent" asChild>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  Visit the live site
                  <ExternalLink />
                </a>
              </Button>
            )}
            {caseStudy && (
              <Button variant="outline" asChild>
                <Link href={`/portfolio/${caseStudy.slug}`}>
                  Read the full case study
                  <ArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-card p-6 sm:p-8">
              <p className="bp-label mb-4">The challenge</p>
              <p className="text-lg leading-relaxed">{project.challenge}</p>
            </div>
            <div className="bg-card p-6 sm:p-8">
              <p className="bp-label mb-4">The solution</p>
              <p className="text-lg leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-12">
          {project.strategy?.length > 0 && (
            <div>
              <div className="bp-heading mb-6">
                <h2 className="text-3xl font-bold">Approach</h2>
                <span className="bp-note">{project.strategy.length} steps</span>
              </div>
              <ol className="border-t border-border">
                {project.strategy.map((step: string, index: number) => (
                  <li key={step} className="flex gap-5 py-4 border-b border-border">
                    <span className="font-mono text-sm text-accent pt-0.5">{String(index + 1).padStart(2, "0")}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="space-y-10">
            {project.results?.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Outcome</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.results.map((result: string) => (
                    <li key={result} className="bp-result">
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.services?.length > 0 && (
              <div>
                <p className="bp-label mb-4">Services provided</p>
                <ul className="flex flex-wrap gap-2">
                  {project.services.map((service: string) => (
                    <li key={service} className="font-mono text-xs border border-border bg-card px-2.5 py-1.5">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-6">Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((image: string, index: number) => (
                <div key={image} className="bp-panel p-2">
                  <img
                    src={`${image}?w=1200&auto=format`}
                    alt={`${project.title} screen ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.testimonial && (
        <section className="py-12 lg:py-16">
          <div className="container-wide">
            <figure className="bg-foreground text-background p-8 sm:p-12 max-w-4xl">
              <blockquote className="text-2xl sm:text-3xl leading-snug tracking-tight">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold">{project.testimonial.author}</p>
                <p className="font-mono text-xs text-background/70 mt-1">
                  {project.testimonial.role}
                  {project.testimonial.company ? ` · ${project.testimonial.company}` : ""}
                </p>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <nav className="py-10" aria-label="More projects">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-px bg-border border border-border">
            <Link href={`/projects/${prevProject.slug}`} className="group bg-card p-5 sm:p-6 flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform shrink-0" />
              <span className="min-w-0">
                <span className="bp-label block">Previous</span>
                <span className="font-semibold block truncate group-hover:text-accent transition-colors">{prevProject.title}</span>
              </span>
            </Link>
            <Link href={`/projects/${nextProject.slug}`} className="group bg-card p-5 sm:p-6 flex items-center justify-end gap-3 text-right">
              <span className="min-w-0">
                <span className="bp-label block">Next</span>
                <span className="font-semibold block truncate group-hover:text-accent transition-colors">{nextProject.title}</span>
              </span>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </div>
      </nav>

      <CTA
        title="Want a website like this?"
        description="Tell me about your organisation and what your visitors need to do. I reply to every enquiry within 24 hours."
      />
    </Layout>
  );
}
