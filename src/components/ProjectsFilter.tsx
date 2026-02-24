"use client";

import { useState } from "react";
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
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <section className="py-8 bg-background border-b border-border/50 sticky top-20 z-40 backdrop-blur-xl bg-background/80">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => {
                const isLarge = index % 5 === 0;
                const isMedium = index % 3 === 1;
                
                return (
                  <Link
                    key={project._id}
                    href={`/projects/${project.slug}`}
                    className={`glass-card-hover overflow-hidden group ${
                      isLarge ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                  >

                    <div className={`relative overflow-hidden ${
                      isLarge ? "h-72" : isMedium ? "h-56" : "h-48"
                    }`}>
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                      
                      {project.tags && project.tags.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 glass-card text-xs font-medium text-accent">
                            {project.tags[0]}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-4 right-4 w-10 h-10 glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {project.year && <span>{project.year}</span>}
                        {project.duration && <span>•</span>}
                        {project.duration && <span>{project.duration}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
