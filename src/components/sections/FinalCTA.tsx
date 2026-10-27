import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const promises = ["Free first call", "No obligation", "Reply within 24 hours"];

const FinalCTA = () => {
  return (
    <section className="pt-8 pb-20 lg:pb-24" aria-labelledby="final-cta-title">
      <div className="container-wide">
        <div className="bg-foreground text-background p-8 sm:p-12 lg:p-16 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-background/60 mb-6">Start a project</p>
            <h2 id="final-cta-title" className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.02] tracking-[-0.03em]">
              Let&apos;s draw up your next website.
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 font-mono text-xs text-background/70">
              {promises.map((promise) => (
                <li key={promise} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-annotation" aria-hidden="true" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">
                Book a free call
                <ArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-transparent border border-background/30 text-background hover:bg-background/10"
            >
              <Link href="/portfolio">See the case studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
