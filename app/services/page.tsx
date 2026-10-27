import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import { generateSEO } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { CMS_REVALIDATE, docTag, listTag } from "@/lib/cms-cache";
import { getServiceTag } from "@/lib/service-tags";

export const metadata = generateSEO({
  title: "Our Services",
  description:
    "Expert web design, UI/UX design, development, SEO, and digital marketing services. We create custom solutions that drive growth and deliver measurable ROI for your business.",
  keywords: ["web design services", "UI/UX design services", "SEO services", "digital marketing", "web development", "ecommerce solutions", "custom websites"],
  canonical: "https://realdiamonddigital.studio/services",
});

interface SubService {
  _key: string;
  name: string;
}

interface Service {
  _id: string;
  id: {
    current: string;
  };
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  benefits: string[];
  bestFor: string;
  subServices: SubService[];
}

async function getServices(): Promise<Service[]> {
  return client.fetch<Service[]>(
    `*[_type == "service"] | order(order asc) {
      _id,
      id,
      title,
      tagline,
      problem,
      solution,
      benefits,
      bestFor,
      subServices[]{ _key, name }
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.service,
        tags: [docTag("service"), listTag("service")],
      },
    }
  );
}

const Services = async () => {
  const services = await getServices();

  return (
    <Layout>
      <PageHeader
        eyebrow="Services"
        title="Everything a website needs, from structure to search."
        note={`${services.length} services · one team from first sketch to launch`}
        description="I plan, design, build and grow websites for organisations that want visitors to understand them at first glance. Pick one service or combine them into a single project."
      >
        <nav aria-label="Services on this page" className="flex flex-wrap gap-2 mt-10">
          {services.map((service) => (
            <a
              key={service._id}
              href={`#${service.id.current}`}
              className="font-mono text-xs border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent transition-colors"
            >
              {getServiceTag(service.title)} · {service.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="pb-8">
        <div className="container-wide space-y-8">
          {services.map((service) => (
            <article key={service._id} id={service.id.current} className="bp-panel scroll-mt-28">
              <header className="px-6 sm:px-8 py-6 sm:py-8 border-b border-border">
                <p className="bp-label mb-3">{getServiceTag(service.title)}</p>
                <h2 className="text-3xl sm:text-4xl font-bold">{service.title}</h2>
                {service.tagline && <p className="text-lg text-accent mt-2">{service.tagline}</p>}
              </header>

              <div className="grid lg:grid-cols-2">
                <div className="p-6 sm:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-border">
                  {service.problem && (
                    <div>
                      <p className="bp-label mb-3">The problem</p>
                      <p className="text-muted-foreground leading-relaxed">{service.problem}</p>
                    </div>
                  )}
                  {service.solution && (
                    <div>
                      <p className="bp-label mb-3">The solution</p>
                      <p className="text-foreground leading-relaxed">{service.solution}</p>
                    </div>
                  )}
                  {service.bestFor && (
                    <p className="bp-note text-xs leading-relaxed border-l border-annotation pl-3">
                      Best for: {service.bestFor}
                    </p>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-8">
                  {service.benefits?.length > 0 && (
                    <div>
                      <p className="bp-label mb-4">What you get</p>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 bg-accent shrink-0" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.subServices?.length > 0 && (
                    <div>
                      <p className="bp-label mb-3">Includes</p>
                      <ul className="flex flex-wrap gap-2">
                        {service.subServices.map((sub) => (
                          <li key={sub._key} className="font-mono text-xs border border-border px-2.5 py-1.5">
                            {sub.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-auto">
                    <Button variant="accent" asChild>
                      <Link href="/contact">
                        Discuss this service
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTA
        title="Not sure which service you need?"
        description="Tell me about your goals and I'll recommend the smallest project that gets you there."
        buttonText="Book a free call"
      />
    </Layout>
  );
};

export default Services;
