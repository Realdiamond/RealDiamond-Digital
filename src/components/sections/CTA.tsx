import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CTA = ({
  title = "Let's draw up your next website.",
  description = "Tell me what you're trying to achieve. I reply to every enquiry within 24 hours.",
  buttonText = "Book a free call",
  buttonLink = "/contact",
}: CTAProps) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wide">
        <div className="bg-foreground text-background p-8 sm:p-12 lg:p-16 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-wider text-background/60 mb-6">Next step</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.03em]">{title}</h2>
            <p className="text-lg text-background/75 leading-relaxed mt-6 max-w-2xl">{description}</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href={buttonLink}>
                {buttonText}
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

export default CTA;
