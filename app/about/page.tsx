import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import ProofBar from "@/components/sections/ProofBar";
import { generateSEO } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { CMS_REVALIDATE, docTag, listTag } from "@/lib/cms-cache";

export const metadata = generateSEO({
  title: "About",
  description:
    "RealDiamond Digital is a small design and development studio led by Oluwatimilehin Akinsanmi, a UI/UX designer and front-end developer based in Nigeria and working worldwide.",
  keywords: ["about", "UI/UX designer", "front-end developer", "web design studio", "Oluwatimilehin Akinsanmi"],
  canonical: "https://realdiamonddigital.studio/about",
});

// Time-based ISR
export const revalidate = 3600;

async function getFounder() {
  return client.fetch(
    `*[_type == "teamMember" && role match "CEO*"][0]{
      name,
      role,
      bio,
      "image": image.asset->url,
      linkedin
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.teamMember,
        tags: [docTag("teamMember"), listTag("teamMember")],
      },
    }
  );
}

const principles = [
  {
    title: "Structure first",
    description:
      "We agree the pages, content and the path to each action before any visual design, so nothing important gets lost in the styling.",
  },
  {
    title: "You talk to the designer",
    description:
      "No account managers in between. You work directly with me, and I bring in trusted collaborators when a project needs extra hands.",
  },
  {
    title: "Built for your team",
    description:
      "Every site comes with a CMS or WordPress set up around your content, so you can update pages without calling a developer.",
  },
  {
    title: "Refined after launch",
    description:
      "Launch is a starting point. I look at how visitors actually use the site and keep improving the pages that matter most.",
  },
];

const About = async () => {
  const founder = await getFounder();
  const name = founder?.name || "Oluwatimilehin Akinsanmi";

  const facts = [
    { label: "Role", value: "Founder, front-end developer & UI/UX designer" },
    { label: "Stack", value: "React · Next.js · TypeScript · React Native · Tailwind CSS · WordPress" },
    { label: "Training", value: "HNG Internship, Frontend track (2025)" },
    { label: "Education", value: "B.Tech Information Technology, Federal University of Technology, Akure" },
    { label: "Certification", value: "Google UX Design Professional Certificate" },
    { label: "Clients in", value: "Nigeria · USA · Canada · New Zealand" },
  ];

  return (
    <Layout>
      <PageHeader
        eyebrow="About"
        title="A small studio, led by the developer who builds your site."
        description={`RealDiamond Digital is the studio of ${name}. Since 2023 I've designed and built websites for non-profits, churches, consultancies, financial services and small businesses.`}
      />

      <section className="pb-16 lg:pb-24">
        <div className="container-wide grid lg:grid-cols-[360px_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
          {founder?.image && (
            <figure className="bp-crop bp-panel p-3 w-full max-w-[320px] mx-auto lg:mx-0 lg:max-w-none">
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <Image
                src={founder.image}
                alt={name}
                width={720}
                height={900}
                sizes="(min-width: 1024px) 360px, 320px"
                className="w-full aspect-[4/5] object-cover object-top grayscale"
              />
              <figcaption className="flex justify-between gap-4 mt-3 font-mono text-xs text-muted-foreground">
                <span>{name}</span>
                <span>Founder</span>
              </figcaption>
            </figure>
          )}

          <div className="min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Hi, I&apos;m {name.split(" ")[0]}.</h2>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground max-w-2xl">
              {founder?.bio ? (
                <p>{founder.bio}</p>
              ) : (
                <>
                  <p>
                    I&apos;m a front-end developer and UI/UX designer. I build websites and web apps with React, Next.js
                    and TypeScript, and I started RealDiamond Digital to give organisations software that is fast,
                    accessible and easy to manage, without the layers of a large agency.
                  </p>
                  <p>
                    I&apos;ve shipped client websites, a booking platform with role-based access, an AI-powered web app
                    and an offline-first mobile app. When a project needs more hands, I work with a small group of trusted
                    collaborators, and you keep one point of contact: me.
                  </p>
                </>
              )}
            </div>

            <dl className="grid sm:grid-cols-2 gap-px bg-border border border-border mt-10">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-card p-5">
                  <dt className="bp-label mb-2">{fact.label}</dt>
                  <dd className="font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  Discuss your project
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/Realdiamond" target="_blank" rel="noopener noreferrer">GitHub</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProofBar />

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="bp-heading mb-10">
            <h2 className="text-4xl md:text-5xl font-bold">How I work</h2>
            <span className="bp-note">four principles behind every project</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {principles.map((principle) => (
              <div key={principle.title} className="bg-card p-6 sm:p-7">
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Let's work together."
        description="Tell me about your organisation and what you need your website to do. I reply to every enquiry within 24 hours."
      />
    </Layout>
  );
};

export default About;
