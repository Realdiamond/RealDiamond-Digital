import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { generateSEO } from "@/lib/seo";
import { profile, skillGroups, processSteps, caseStudies } from "@/data/portfolio";
import { ArrowRight, Mail, Linkedin, PenTool, Layers, CheckCircle } from "lucide-react";

export const metadata = generateSEO({
  title: `${profile.name} – UI/UX Portfolio`,
  description: `${profile.name}, ${profile.title}. Selected case studies in UI/UX design, design systems, and responsive web design.`,
  keywords: ["UI/UX designer portfolio", "UI designer", "UX designer", "design systems", "front-end developer"],
  canonical: "https://realdiamonddigital.studio/portfolio",
});

export default function PortfolioPage() {
  return (
    <Layout>
      <section className="pt-24 pb-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
              <PenTool className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">UI/UX Portfolio</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              {profile.name}
            </h1>
            <p className="text-2xl md:text-3xl text-gradient font-semibold mb-6">{profile.title}</p>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">{profile.intro}</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{profile.about}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link href="#case-studies">
                  View case studies
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-20 bg-secondary/30 scroll-mt-24">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Selected case studies</h2>
            <p className="text-lg text-muted-foreground">
              Live projects I designed and built, from the problem to the shipped interface.
            </p>
          </div>

          <div className="space-y-10">
            {caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                href={`/portfolio/${study.slug}`}
                className="group grid lg:grid-cols-2 gap-8 items-center glass-card p-6 md:p-8 hover:shadow-elevated transition-all duration-500"
              >
                <div className={`overflow-hidden rounded-xl border border-border/50 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={study.images.hero.src}
                    width={study.images.hero.width}
                    height={study.images.hero.height}
                    alt={study.images.hero.alt}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent mb-2">
                    {study.industry} · {study.year}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{study.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded-lg border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                    Read case study
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}

            <Link
              href="/portfolio/design-system"
              className="group block glass-card p-6 md:p-8 hover:shadow-elevated transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-accent mb-1">Design system</p>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    The RealDiamond Digital design system
                  </h3>
                  <p className="text-muted-foreground">
                    The tokens, type scale, and components behind realdiamonddigital.studio, built in Tailwind CSS and
                    React with light and dark themes.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                  Explore the system
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillGroups.map((group) => (
              <div key={group.title} className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-4">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">How I work</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <li key={step.title} className="glass-card p-6">
                <span className="text-sm font-semibold text-accent">0{index + 1}</span>
                <h3 className="font-semibold text-foreground text-lg mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Let's work together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm open to UI/UX design roles and collaborations. I'd love to hear about your team and product.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="accent" size="lg" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="w-4 h-4" />
                  Email me
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
