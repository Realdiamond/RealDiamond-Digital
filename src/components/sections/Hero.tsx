import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { CMS_REVALIDATE, docTag, listTag } from "@/lib/cms-cache";

async function getFounder() {
  return client.fetch<{ name?: string; image?: string } | null>(
    `*[_type == "teamMember" && role match "CEO*"][0]{ name, "image": image.asset->url }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.teamMember,
        tags: [docTag("teamMember"), listTag("teamMember")],
      },
    }
  );
}

export default async function Hero() {
  const founder = await getFounder();
  const founderName = founder?.name || "Oluwatimilehin Akinsanmi";

  return (
    <section className="pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className="container-wide grid lg:grid-cols-[minmax(0,1fr)_340px] gap-16 lg:gap-20 items-center">
        <div className="min-w-0">
          <p className="bp-label mb-12">UI/UX design · Web development · SEO · Since 2023</p>

          <div className="relative bp-frame">
            <span className="bp-note absolute -top-9 left-0 hidden sm:block" aria-hidden="true">
              H1 · Familjen Grotesk Bold · 88/86
            </span>
            <h1 className="text-[44px] leading-[1.02] sm:text-6xl lg:text-[88px] lg:leading-[0.98] font-bold tracking-[-0.03em]">
              I design the <span className="bp-highlight">structure</span> before the pixels.
            </h1>
            <span className="bp-note absolute -bottom-9 right-0 hidden sm:block" aria-hidden="true">
              max-width · 12 cols
            </span>
          </div>

          <div className="bp-spacer my-4" data-size="40" aria-hidden="true" />

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
            I&apos;m <strong className="text-foreground font-semibold">{founderName}</strong>, a UI/UX designer and
            front-end developer. With a small team of trusted collaborators, I plan, design and build websites for
            non-profits, churches, consultancies and growing businesses, so visitors always know where to go next.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">
                Book a free call
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">See the case studies</Link>
            </Button>
          </div>
        </div>

        {founder?.image && (
          <figure className="bp-crop bp-panel p-3 w-full max-w-[300px] mx-auto lg:max-w-none lg:mx-0">
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <Image
              src={founder.image}
              alt={founderName}
              width={680}
              height={850}
              sizes="(min-width: 1024px) 340px, 300px"
              className="w-full aspect-[4/5] object-cover object-top grayscale"
              priority
            />
            <figcaption className="flex justify-between gap-4 mt-3 font-mono text-xs text-muted-foreground">
              <span>Founder &amp; lead designer</span>
              <span>4:5</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
