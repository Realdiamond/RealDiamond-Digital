"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-background via-accent/[0.02] to-accent-secondary/[0.02]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent/5 to-accent-secondary/5 blur-[140px] opacity-50" />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              Let's Build Something Amazing
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1]">
            Ready to Get More
            <br />
            <span className="text-gradient">Qualified Leads?</span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's talk about your business and build a website that fills your schedule with ready-to-buy customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="xl" 
              asChild 
              className="group bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white font-bold text-lg px-8"
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              asChild 
              className="group border-2 font-semibold text-lg px-8"
            >
              <Link href="/projects">
                View Our Work
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Free consultation</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>No obligations</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Response within 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
