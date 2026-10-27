import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import WorkSection from "@/components/sections/WorkSection";
import DevProjects from "@/components/sections/DevProjects";
import { generateSEO } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { CMS_REVALIDATE, docTag, listTag } from "@/lib/cms-cache";
import { profile, skillGroups, processSteps } from "@/data/portfolio";

export const metadata = generateSEO({
  title: `${profile.name} – Developer Portfolio`,
  description: `${profile.name}, ${profile.title}. Selected web apps, mobile apps and client websites built with React, Next.js and TypeScript.`,
  keywords: ["front-end developer portfolio", "React developer", "Next.js developer", "TypeScript", "web developer"],
  canonical: "https://realdiamonddigital.studio/portfolio",
});

async function getPortrait() {
  return client.fetch<string | null>(
    `*[_type == "teamMember" && role match "CEO*"][0].image.asset->url`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.teamMember,
        tags: [docTag("teamMember"), listTag("teamMember")],
      },
    }
  );
}

export default async function PortfolioPage() {
  const portrait = await getPortrait();

  return (
    <Layout hideAgencyWidgets>
      <section className="pt-14 pb-16 lg:pt-20 lg:pb-20">
        <div className="container-wide grid lg:grid-cols-[minmax(0,1fr)_320px] gap-14 lg:gap-20 items-center">
          <div className="min-w-0">
            <p className="bp-label mb-8">Developer portfolio</p>
            <h1 className="text-[44px] leading-[1.02] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em]">{profile.name}</h1>
            <p className="text-2xl sm:text-3xl font-semibold text-accent mt-4">{profile.title}</p>
            <div className="bp-spacer my-4" data-size="32" aria-hidden="true" />
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">{profile.intro}</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mt-4">{profile.about}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link href="#work">
                  View my work
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail />
                  {profile.email}
                </a>
              </Button>
            </div>
          </div>

          {portrait && (
            <figure className="bp-crop bp-panel p-3 w-full max-w-[280px] mx-auto lg:max-w-none lg:mx-0">
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <Image
                src={portrait}
                alt={profile.name}
                width={640}
                height={800}
                sizes="(min-width: 1024px) 320px, 280px"
                className="w-full aspect-[4/5] object-cover object-top grayscale"
                priority
              />
              <figcaption className="flex justify-between gap-4 mt-3 font-mono text-xs text-muted-foreground">
                <span>Front-end developer</span>
                <span>Nigeria</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <div id="work" className="scroll-mt-20">
        <DevProjects />
        <WorkSection title="Client websites" note="structure on the left, shipped site on the right" />
      </div>

      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <Link
            href="/portfolio/design-system"
            className="group grid md:grid-cols-[1fr_auto] gap-6 items-center bp-panel p-6 sm:p-8 hover:border-accent transition-colors"
          >
            <div>
              <p className="bp-label mb-3">Design system case study</p>
              <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors">
                The Source design system
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-2 max-w-3xl">
                The tokens, type, annotation kit and components behind realdiamonddigital.studio, built in Tailwind CSS
                and React and rendered live from the production code.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-accent group-hover:gap-3 transition-all">
              Explore the system
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="bp-heading mb-10">
            <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {skillGroups.map((group) => (
              <div key={group.title} className="bg-card p-6">
                <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 w-1.5 h-1.5 bg-accent shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="bp-heading mb-10">
            <h2 className="text-4xl md:text-5xl font-bold">How I work</h2>
            <span className="bp-note">structure before pixels</span>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {processSteps.map((step, index) => (
              <li key={step.title} className="bg-card p-6 sm:p-7">
                <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-semibold mt-6 mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="container-wide">
          <div className="bg-foreground text-background p-8 sm:p-12 lg:p-16 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-background/60 mb-6">Get in touch</p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-[-0.03em]">Let&apos;s work together.</h2>
              <p className="text-lg text-background/75 leading-relaxed mt-5 max-w-xl">
                I&apos;m open to front-end developer roles and freelance projects. I&apos;d love to hear about your team and product.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button variant="accent" size="lg" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail />
                  Email me
                </a>
              </Button>
              <Button
                size="lg"
                asChild
                className="bg-transparent border border-background/30 text-background hover:bg-background/10"
              >
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin />
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
