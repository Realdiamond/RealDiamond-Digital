import { client } from "@/sanity/lib/client";
import Layout from "@/components/layout/Layout";
import { Sparkles } from "lucide-react";
import ProjectsFilter from "@/components/ProjectsFilter";

async function getProjects() {
  const projects = await client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      description,
      "image": image.asset->url,
      tags,
      year,
      duration,
      featured,
      order
    }
  `);
  return projects;
}

// Revalidate every 60 seconds - content updates within 1 minute
export const revalidate = 60;

const serviceCategories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Design" },
  { id: "seo", name: "SEO" },
  { id: "branding", name: "Branding" },
  { id: "ecommerce", name: "E-Commerce" },
];

export default async function Projects() {
  const allProjects = await getProjects();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Our Work</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Projects That{" "}
              <span className="text-gradient">Deliver Results</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our successful projects. Each one represents a unique challenge 
              we solved and a business we helped grow.
            </p>
          </div>
        </div>
      </section>

      <ProjectsFilter projects={allProjects} categories={serviceCategories} />
    </Layout>
  );
}
