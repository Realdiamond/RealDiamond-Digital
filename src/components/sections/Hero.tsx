"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Search, Palette, Zap, TrendingUp, CheckCircle } from "lucide-react";

const services = [
  { icon: Globe, label: "Web Design", color: "from-blue-500 to-cyan-500" },
  { icon: Search, label: "SEO", color: "from-green-500 to-emerald-500" },
  { icon: Palette, label: "Branding", color: "from-purple-500 to-pink-500" },
  { icon: Zap, label: "Lead Gen", color: "from-orange-500 to-red-500" },
];

const Hero = () => {
  return (
    <section className="relative h-[85vh] pt-20 flex items-center justify-center overflow-hidden bg-secondary/10">
      {/* Mesh Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating Cards - Left Side */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden xl:block animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="space-y-10">
          {/* Success Card */}
          <div className="w-64 glass-card p-5 animate-float">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">Project Success</div>
                <div className="text-xs text-muted-foreground">HVAC Pro Inc.</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              250% increase in booked calls
            </div>
          </div>

          {/* Growth Card */}
          <div className="w-56 glass-card p-4 animate-float" style={{ animationDelay: "-3s" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Lead Growth</span>
              <span className="text-xs text-accent font-semibold">+320%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-accent-secondary w-4/5 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cards - Right Side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="w-60 glass-card p-5 animate-float" style={{ animationDelay: "-1s" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-xs text-muted-foreground">Client Retention</div>
              </div>
            </div>
          </div>

          {/* Traffic Card */}
          <div className="w-56 glass-card p-4 animate-float" style={{ animationDelay: "-4s" }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Traffic Boost</span>
            </div>
            <div className="text-2xl font-bold text-foreground">3.5x</div>
            <div className="text-xs text-muted-foreground">Average increase</div>
          </div>
        </div>
      </div>

      <div className="container-wide relative z-10 text-center px-4">
        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Massive Headline */}
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tighter animate-fade-in">
            More Calls.
            <br />
            <span className="text-gradient">More Revenue.</span>
          </h1>

          {/* Punchy Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            We build high-converting websites and run local SEO for service businesses that want real results.
          </p>

          {/* Two CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              size="lg" 
              asChild 
              className="group bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white font-semibold text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 h-auto w-[90%] sm:w-auto"
            >
              <Link href="/contact#consultation">
                Get Your Free Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="group border-2 font-semibold text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 h-auto w-[90%] sm:w-auto"
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="pt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.label}
                    className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg cursor-default"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-semibold text-foreground text-sm">{service.label}</span>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="pt-4 space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-sm text-muted-foreground">
              Trusted by growing innovative businesses
            </div>
            
            {/* Logo Carousel */}
            <div className="relative overflow-hidden max-w-2xl mx-auto">
              <div className="flex gap-8 animate-marquee">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-32 h-16 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 flex items-center justify-center">
                    <div className="text-muted-foreground/50 font-semibold text-sm">Logo {i + 1}</div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[...Array(6)].map((_, i) => (
                  <div key={`dup-${i}`} className="flex-shrink-0 w-32 h-16 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 flex items-center justify-center">
                    <div className="text-muted-foreground/50 font-semibold text-sm">Logo {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
