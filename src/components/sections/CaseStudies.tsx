import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "E-commerce Revenue Boost",
    problem: "Online store with 2% conversion rate and slow page loads",
    solution: "Complete redesign with Next.js, performance optimization, and checkout flow refinement",
    result: "5.8% conversion rate (+290%), 0.8s page load time, $180K additional monthly revenue",
    link: "/projects",
  },
  {
    title: "SaaS Lead Generation",
    problem: "B2B SaaS struggling with organic traffic and demo bookings",
    solution: "Technical SEO overhaul, content strategy, and landing page optimization",
    result: "320% organic traffic increase, 45 demo bookings/month (up from 8), 6-month ROI",
    link: "/projects",
  },
  {
    title: "Service Business Growth",
    problem: "Local service provider with outdated site and low inquiries",
    solution: "Modern responsive design, local SEO, and automated booking system",
    result: "250% inquiry increase, #1 Google rankings for 12 keywords, 40% time savings",
    link: "/projects",
  },
];

export default function CaseStudies() {
  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real Results for <span className="text-gradient">Real Businesses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we've helped businesses like yours achieve measurable growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="glass-card p-8 flex flex-col hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                {study.title}
              </h3>
              
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Challenge</p>
                  <p className="text-sm text-foreground leading-relaxed">{study.problem}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Solution</p>
                  <p className="text-sm text-foreground leading-relaxed">{study.solution}</p>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm font-semibold text-accent mb-2">Results</p>
                  <p className="text-sm font-bold text-foreground leading-relaxed">{study.result}</p>
                </div>
              </div>
              
              <Button variant="link" className="mt-6 p-0 h-auto text-accent hover:text-accent/80" asChild>
                <Link href={study.link} className="flex items-center gap-2">
                  View similar projects <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
