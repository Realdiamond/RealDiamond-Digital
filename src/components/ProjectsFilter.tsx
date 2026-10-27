"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  duration: string;
}

interface ProjectsFilterProps {
  projects: Project[];
  categories: Array<{ id: string; name: string }>;
}

export default function ProjectsFilter({ projects, categories }: ProjectsFilterProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Only offer filters that have at least one project behind them
  const availableCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          count: category.id === "all" ? projects.length : projects.filter((p) => p.category === category.id).length,
        }))
        .filter((category) => category.count > 0),
    [categories, projects]
  );

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name || id;

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-y border-border">
        <div className="container-wide py-3 overflow-x-auto">
          <div className="flex gap-2 w-max" role="group" aria-label="Filter projects by category">
            {availableCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
                className={`font-mono text-xs px-3 py-2 border transition-colors whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground"
                }`}
              >
                {category.name} <span className="opacity-60">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {filteredProjects.map((project) => (
              <Link key={project._id} href={`/projects/${project.slug}`} className="group bg-card flex flex-col">
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                  {project.image && (
                    <img
                      src={`${project.image}?w=1200&auto=format`}
                      alt={`${project.title} website`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <p className="bp-label mb-3 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="text-accent">{categoryName(project.category)}</span>
                    {project.year && <span>{project.year}</span>}
                    {project.duration && <span>{project.duration}</span>}
                  </p>
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">{project.title}</h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">{project.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 font-semibold text-accent text-sm">
                    View project
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
            {filteredProjects.length % 2 === 1 && <div className="hidden md:block bg-card" aria-hidden="true" />}
          </div>
        </div>
      </section>
    </>
  );
}
