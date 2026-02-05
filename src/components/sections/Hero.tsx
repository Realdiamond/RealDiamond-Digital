"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Star } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 bg-accent -top-40 -right-40 animate-pulse"
          style={{ 
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 bg-accent-secondary -bottom-40 -left-40"
          style={{ 
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Mesh Gradient Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 2px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-wide relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm animate-fade-in">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                Rated 5.0 by 50+ Clients
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight animate-slide-up">
              We Build Websites That
              <br />
              <span className="relative inline-block">
                <span className="text-gradient">Increase Revenue by 3x</span>
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-3" 
                  viewBox="0 0 300 12" 
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M2 6C50 3 100 2 150 4C200 6 250 8 298 6" 
                    stroke="url(#hero-underline)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="hero-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--accent))" />
                      <stop offset="100%" stopColor="hsl(var(--accent-secondary))" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-slide-up max-w-xl" style={{ animationDelay: "0.1s" }}>
              Strategic web design, development, and SEO that transforms visitors into customers. Trusted by 50+ businesses to deliver measurable growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button 
                size="xl" 
                asChild 
                className="group bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white font-bold"
              >
                <Link href="/contact">
                  Book a 20-Min Strategy Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                asChild 
                className="group border-2 font-semibold"
              >
                <Link href="/projects">
                  View Our Portfolio
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {[
                { value: "50+", label: "Projects" },
                { value: "95%", label: "Satisfaction" },
                { value: "3x", label: "Avg. ROI" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative animate-fade-in lg:block hidden" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-full aspect-square">
              {/* Floating Cards */}
              <div className="absolute top-0 right-0 w-72 glass-card p-6 animate-float">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Project Launched</div>
                    <div className="text-xs text-muted-foreground">TechStart Solutions</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  3x conversion rate increase
                </div>
              </div>

              <div className="absolute bottom-12 left-0 w-64 glass-card p-5 animate-float" style={{ animationDelay: "-2s" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Traffic Growth</span>
                  <span className="text-xs text-accent font-semibold">+250%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-accent-secondary w-3/4 rounded-full" />
                </div>
              </div>

              <div className="absolute top-1/2 right-12 w-56 glass-card p-5 animate-float" style={{ animationDelay: "-4s" }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary border-2 border-background" />
                    ))}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">95%</div>
                    <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Center Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full bg-gradient-to-r from-accent/20 to-accent-secondary/20 blur-3xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
