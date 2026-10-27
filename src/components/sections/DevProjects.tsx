import { devProjects } from "@/data/developer";

export default function DevProjects() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="builds-title">
      <div className="container-wide">
        <div className="bp-heading mb-10">
          <h2 id="builds-title" className="text-4xl md:text-5xl font-bold">
            Selected builds
          </h2>
          <span className="bp-note">web and mobile apps I engineered the front-end for</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {devProjects.map((project) => (
            <article key={project.name} className="bp-panel flex flex-col">
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border">
                <span className="font-mono text-xs text-muted-foreground truncate">{project.path}</span>
                <span className="flex gap-1.5 shrink-0" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-border" />
                  <span className="w-2 h-2 rounded-full bg-border" />
                  <span className="w-2 h-2 rounded-full bg-border" />
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="bp-label text-accent mb-3">{project.kind}</p>
                <h3 className="text-2xl font-semibold mb-3">{project.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{project.summary}</p>
                <ul className="space-y-2 mb-6 font-mono text-[13px]">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="text-accent" aria-hidden="true">
                        ›
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-border" aria-label="Tech stack">
                  {project.stack.map((tech) => (
                    <li key={tech} className="font-mono text-[11px] text-annotation-ink border border-border px-2 py-1">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
