import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CTA = ({
  title = "Let's Build Something Extraordinary",
  description = "Ready to transform your digital presence? Let's discuss how RealDiamond Digital can help you achieve your business goals.",
  buttonText = "Start Your Project",
  buttonLink = "/contact",
}: CTAProps) => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb bg-orb-1 opacity-30" />
        <div className="bg-orb bg-orb-2 opacity-20" />
      </div>

      <div className="container-wide relative">
        <div className="glass-card p-12 md:p-16 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Ready to Grow?
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-3xl mx-auto">
              {title.includes("Extraordinary") ? (
                <>
                  Let's Build Something{" "}
                  <span className="text-gradient">Extraordinary</span>
                </>
              ) : (
                title
              )}
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link href={buttonLink}>
                  {buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
