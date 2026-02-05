import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Lightbulb, Diamond } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="section-padding bg-secondary/30 border-y border-border/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb bg-orb-1 opacity-15" />
        <div className="bg-orb bg-orb-2 opacity-10" />
      </div>

      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">About RealDiamond Digital</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              A Strategic Partner for Your{" "}
              <span className="text-gradient">Digital Growth</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Led by CEO Oluwatimilehin Akinsanmi and supported by a dedicated team of digital experts, 
              RealDiamond Digital combines strategic thinking with hands-on execution. We're not just 
              service providers—we're your partners in building a digital presence that drives real business results.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Target, title: "Results-Focused Approach", desc: "Every decision is driven by measurable business outcomes." },
                { icon: Users, title: "Dedicated Team", desc: "A small, expert team that treats your project as a priority." },
                { icon: Lightbulb, title: "Strategic Thinking", desc: "Long-term digital strategies, not quick fixes." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 glass-card p-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="accent" asChild>
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="glass-card p-12 relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/10" />
              
              <div className="text-center relative z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-accent to-accent-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 animate-float shadow-glow">
                  <Diamond className="w-16 h-16 text-accent-foreground" />
                </div>
                <p className="font-heading text-2xl font-bold text-foreground mb-2">
                  RealDiamond Digital
                </p>
                <p className="text-muted-foreground">
                  Building Digital Excellence Since Day One
                </p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-2xl -z-10 blur-sm" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-secondary/10 rounded-2xl -z-10 blur-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
