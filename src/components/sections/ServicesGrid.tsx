import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { CMS_REVALIDATE, docTag, listTag } from "@/lib/cms-cache";
import { getServiceTag } from "@/lib/service-tags";

interface FeaturedService {
  _id: string;
  id?: { current?: string };
  title: string;
  tagline?: string;
  solution?: string;
  subServices?: { _key: string; name: string }[];
}

async function getServices() {
  return client.fetch<FeaturedService[]>(
    `*[_type == "service" && featured == true] | order(coalesce(order, 999) asc) {
      _id,
      id,
      title,
      tagline,
      solution,
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

export default async function ServicesGrid() {
  const services = await getServices();

  return (
    <section className="py-16 lg:py-24" aria-labelledby="services-title">
      <div className="container-wide">
        <div className="bp-heading mb-10">
          <h2 id="services-title" className="text-4xl md:text-5xl font-bold">
            Services
          </h2>
          <span className="bp-note">one team, first sketch to launch</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {services.map((service) => (
            <Link
              key={service._id}
              href={`/services#${service.id?.current || service._id}`}
              className="group p-6 sm:p-7 bg-card hover:bg-secondary transition-colors"
            >
              <p className="bp-label">{getServiceTag(service.title)}</p>
              <h3 className="text-xl font-semibold mt-3 mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.tagline || service.solution}</p>
              {service.subServices && service.subServices.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-5">
                  {service.subServices.slice(0, 4).map((sub) => (
                    <li key={sub._key} className="font-mono text-[11px] text-muted-foreground border border-border px-2 py-1">
                      {sub.name}
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          ))}

          <Link
            href="/contact"
            className="group p-6 sm:p-7 bg-foreground text-background flex flex-col justify-between gap-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-background/70">Not sure?</p>
              <h3 className="text-xl font-semibold mt-3 mb-2">Tell me what you&apos;re trying to fix</h3>
              <p className="text-background/75 leading-relaxed">
                A free call to work out what your website actually needs.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
              Book a free call
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
