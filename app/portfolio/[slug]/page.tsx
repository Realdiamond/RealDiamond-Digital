import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { generateSEO } from "@/lib/seo";
import { caseStudies, getCaseStudy, profile } from "@/data/portfolio";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";

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
    title: `${study.title} – UI/UX Case Study`,
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
      <section className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
        </div>

        <div className="container-wide relative">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>

          <div className="max-w-3xl mb-10">
            <p className="text-sm font-medium text-accent mb-3">UI/UX Case Study</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{study.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{study.summary}</p>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {facts.map((fact) => (
              <div key={fact.label} className="glass-card p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">{fact.label}</dt>
                <dd className="text-sm font-semibold text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="overflow-hidden rounded-2xl border border-border/50 shadow-elevated">
            <Image
              src={study.images.hero.src}
              width={study.images.hero.width}
              height={study.images.hero.height}
              alt={study.images.hero.alt}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="mt-6">
            <Button variant="outline" asChild>
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit the live site
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">The challenge</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{study.challenge}</p>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">My approach</h2>
            <ul className="space-y-3">
              {study.approach.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">Key design decisions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {study.decisions.map((decision, i) => (
              <div key={decision.title} className="glass-card p-6">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="font-semibold text-lg text-foreground mt-2 mb-2">{decision.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{decision.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Structure and final design</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            The wireframe view strips the live page back to its layout and content hierarchy, next to the finished design
            on mobile.
          </p>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
            <figure className="glass-card p-4">
              <div className="max-h-[900px] overflow-hidden rounded-xl border border-border/50">
                <Image
                  src={study.images.wireframe.src}
                  width={study.images.wireframe.width}
                  height={study.images.wireframe.height}
                  alt={study.images.wireframe.alt}
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="text-sm text-muted-foreground mt-3">Wireframe view of the homepage layout</figcaption>
            </figure>
            <figure className="glass-card p-4 max-w-sm mx-auto w-full">
              <div className="overflow-hidden rounded-[2rem] border-8 border-foreground/90">
                <Image
                  src={study.images.mobile.src}
                  width={study.images.mobile.width}
                  height={study.images.mobile.height}
                  alt={study.images.mobile.alt}
                  sizes="(min-width: 1024px) 360px, 80vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="text-sm text-muted-foreground mt-3 text-center">Mobile</figcaption>
            </figure>
          </div>

          {study.images.page && (
            <figure className="glass-card p-4 mt-8">
              <div className="max-h-[1100px] overflow-hidden rounded-xl border border-border/50">
                <Image
                  src={study.images.page.src}
                  width={study.images.page.width}
                  height={study.images.page.height}
                  alt={study.images.page.alt}
                  sizes="(min-width: 1280px) 1184px, 100vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="text-sm text-muted-foreground mt-3">Desktop homepage</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">Outcome</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {study.outcomes.map((outcome) => (
              <li key={outcome} className="glass-card p-5 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Button variant="outline" size="lg" asChild>
            <a href={`mailto:${profile.email}`}>Get in touch</a>
          </Button>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group inline-flex items-center gap-3 text-right"
          >
            <span>
              <span className="block text-sm text-muted-foreground">Next case study</span>
              <span className="block font-heading text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                {next.title}
              </span>
            </span>
            <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
