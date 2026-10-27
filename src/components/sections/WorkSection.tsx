import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/portfolio";

const outcomes: Record<string, string> = {
  "bto-global-foundation": "Launched in 5 days",
  "smitbridge-global-ventures": "4 services · 1 clear site",
  "pottery-by-tolu": "+75% traffic in month one",
};

interface WorkSectionProps {
  title?: string;
  note?: string;
}

export default function WorkSection({
  title = "Structure and finished design",
  note = "the layout behind each site",
}: WorkSectionProps) {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="work-title">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="bp-heading">
            <h2 id="work-title" className="text-4xl md:text-5xl font-bold">
              {title}
            </h2>
            <span className="bp-note">{note}</span>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects">
              All projects
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <article key={study.slug} className="bp-panel group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 sm:px-6 py-4 border-b border-border">
                <h3 className="text-2xl font-semibold">{study.title}</h3>
                <p className="bp-label">
                  {study.industry.split(" / ")[0]} · {study.location} · {study.year}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <figure className="relative aspect-[8/5] overflow-hidden bg-secondary">
                  <Image
                    src={study.images.structure.src}
                    width={study.images.structure.width}
                    height={study.images.structure.height}
                    alt={study.images.structure.alt}
                    sizes="(min-width: 1280px) 600px, 50vw"
                    className="w-full h-full object-cover object-top"
                  />
                  <figcaption className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-foreground text-background font-mono text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 sm:py-1">
                    STRUCTURE
                  </figcaption>
                </figure>
                <figure className="relative aspect-[8/5] overflow-hidden bg-secondary border-l-2 border-accent">
                  <Image
                    src={study.images.hero.src}
                    width={study.images.hero.width}
                    height={study.images.hero.height}
                    alt={study.images.hero.alt}
                    sizes="(min-width: 1280px) 600px, 50vw"
                    className="w-full h-full object-cover object-top"
                  />
                  <figcaption className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-accent text-accent-foreground font-mono text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 sm:py-1">
                    FINAL
                  </figcaption>
                </figure>
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-5 md:gap-8 items-center px-5 sm:px-6 py-5 border-t border-border">
                <p className="text-muted-foreground leading-relaxed max-w-3xl">{study.summary}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="bp-result">{outcomes[study.slug]}</span>
                  <Link
                    href={`/portfolio/${study.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-accent hover:gap-3 transition-all"
                  >
                    Read case study
                    <ArrowRight className="w-4 h-4" />
                    <span className="sr-only">: {study.title}</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
