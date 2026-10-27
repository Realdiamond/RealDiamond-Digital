import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { generateSEO } from "@/lib/seo";
import { caseStudies, getCaseStudy, profile } from "@/data/portfolio";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {};
  }

  return generateSEO({
    title: `${study.title} – Case Study`,
    description: study.summary,
    keywords: [...study.tags, "UI/UX case study", "portfolio"],
    ogImage: study.images.hero.src,
    canonical: `https://realdiamonddigital.studio/portfolio/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const index = caseStudies.findIndex((s) => s.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const facts = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.industry },
    { label: "Location", value: study.location },
    { label: "Year", value: study.year },
    { label: "Timeline", value: study.timeline },
    { label: "My role", value: study.role },
  ];

  return (
    <Layout hideAgencyWidgets>
      <section className="pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="container-wide">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>

          <div className="max-w-4xl">
            <p className="bp-label mb-6">Case study · {study.year}</p>
            <h1 className="text-[44px] leading-[1.02] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em]">{study.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mt-6 max-w-3xl">{study.summary}</p>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border mt-10">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-card p-4 flex flex-col gap-1">
                <dt className="bp-label">{fact.label}</dt>
                <dd className="font-semibold text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="bp-panel p-2 sm:p-3 mt-8">
            <Image
              src={study.images.hero.src}
              width={study.images.hero.width}
              height={study.images.hero.height}
              alt={study.images.hero.alt}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="w-full h-auto block"
              priority
            />
          </div>

          <div className="mt-6">
            <Button variant="outline" asChild>
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit the live site
                <ExternalLink />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-card p-6 sm:p-8">
              <p className="bp-label mb-4">The challenge</p>
              <p className="text-lg leading-relaxed">{study.challenge}</p>
            </div>
            <div className="bg-card p-6 sm:p-8">
              <p className="bp-label mb-4">My approach</p>
              <ol className="space-y-3">
                {study.approach.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-mono text-sm text-accent pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Key design decisions</h2>
            <span className="bp-note">what the design does and why</span>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {study.decisions.map((decision) => (
              <div key={decision.title} className="bg-card p-6 sm:p-7">
                <h3 className="text-lg font-semibold mb-2">{decision.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{decision.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Structure and final design</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            The wireframe view strips the live page back to its layout and content hierarchy, next to the finished design
            on mobile.
          </p>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
            <figure className="bp-panel p-3">
              <div className="relative max-h-[900px] overflow-hidden border border-border">
                <Image
                  src={study.images.wireframe.src}
                  width={study.images.wireframe.width}
                  height={study.images.wireframe.height}
                  alt={study.images.wireframe.alt}
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="w-full h-auto"
                />
                <span className="absolute top-3 left-3 bg-foreground text-background font-mono text-[11px] px-2 py-1">
                  STRUCTURE
                </span>
              </div>
              <figcaption className="bp-label mt-3 normal-case tracking-normal">Wireframe view of the homepage layout</figcaption>
            </figure>
            <figure className="bp-panel p-4 max-w-sm mx-auto w-full">
              <div className="overflow-hidden rounded-[2rem] border-[8px] border-foreground">
                <Image
                  src={study.images.mobile.src}
                  width={study.images.mobile.width}
                  height={study.images.mobile.height}
                  alt={study.images.mobile.alt}
                  sizes="(min-width: 1024px) 360px, 80vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="bp-label mt-3 text-center">Mobile · 390px</figcaption>
            </figure>
          </div>

          {study.images.page && (
            <figure className="bp-panel p-3 mt-8">
              <div className="max-h-[1100px] overflow-hidden border border-border">
                <Image
                  src={study.images.page.src}
                  width={study.images.page.width}
                  height={study.images.page.height}
                  alt={study.images.page.alt}
                  sizes="(min-width: 1280px) 1184px, 100vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="bp-label mt-3">Desktop homepage · 1440px</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Outcome</h2>
          <ul className="flex flex-wrap gap-3">
            {study.outcomes.map((outcome) => (
              <li key={outcome} className="bp-result text-sm">
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pt-8 pb-20 lg:pb-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_auto] gap-px bg-border border border-border">
            <Link href={`/portfolio/${next.slug}`} className="group bg-card p-6 sm:p-8 flex items-center justify-between gap-6">
              <span>
                <span className="bp-label block mb-2">Next case study</span>
                <span className="text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors">{next.title}</span>
              </span>
              <ArrowRight className="w-6 h-6 text-accent group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="bg-foreground text-background p-6 sm:p-8 flex items-center justify-center font-semibold hover:bg-foreground/90 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
