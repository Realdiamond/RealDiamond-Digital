"use client";

import { Rocket, Palette, Code, LineChart, CheckCircle2 } from "lucide-react";

const ProcessTimeline = () => {
  const steps = [
    {
      icon: Rocket,
      title: "Discovery & Strategy",
      description: "We dive deep into your business goals, target audience, and competitive landscape to craft a winning strategy.",
      duration: "Week 1-2",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Palette,
      title: "Design & Prototyping",
      description: "Create stunning, conversion-focused designs with interactive prototypes you can click through before development.",
      duration: "Week 2-4",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Code,
      title: "Development & Build",
      description: "Transform designs into lightning-fast, pixel-perfect code with SEO optimization and mobile responsiveness baked in.",
      duration: "Week 4-8",
      color: "from-orange-400 to-amber-400"
    },
    {
      icon: LineChart,
      title: "Launch & Optimize",
      description: "Deploy your new site and continuously improve based on real user data, A/B testing, and performance metrics.",
      duration: "Week 8+",
      color: "from-green-400 to-emerald-400"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb bg-orb-1 opacity-5" />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How We Work With{" "}
            <span className="text-gradient">You</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined process ensures transparency, collaboration, and exceptional results at every stage.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="relative"
              >
                {/* Connector Line (hidden on mobile, shown on larger screens) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-accent/40 to-transparent z-0" />
                )}

                {/* Card */}
                <div className="relative glass-card p-6 group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white font-bold text-lg shadow-glow z-10">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Check Icon */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
