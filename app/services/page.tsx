import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import { generateSEO } from '@/lib/seo';
import { client } from "@/sanity/lib/client";
import { 
  ArrowRight, 
  Globe, 
  Search, 
  Palette, 
  TrendingUp,
  CheckCircle,
  Code,
  FileCode,
  BarChart3,
  MapPin,
  Settings,
  Zap,
  Sparkles,
  Target,
  Rocket,
  Lightbulb,
  Smartphone,
  Monitor,
  ShoppingCart,
  Mail,
  Lock,
  LucideIcon
} from "lucide-react";

// Icon mapping for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
  Globe,
  Search,
  Palette,
  TrendingUp,
  Code,
  FileCode,
  BarChart3,
  MapPin,
  Settings,
  Zap,
  Sparkles,
  CheckCircle,
  Target,
  Rocket,
  Lightbulb,
  Smartphone,
  Monitor,
  ShoppingCart,
  Mail,
  Lock,
};

export const metadata = generateSEO({
  title: 'Our Services',
  description: 'Expert web design, development, SEO, and digital marketing services. We create custom solutions that drive growth and deliver measurable ROI for your business.',
  keywords: ['web design services', 'SEO services', 'digital marketing', 'web development', 'ecommerce solutions', 'custom websites'],
  canonical: 'https://realdiamond-digital.vercel.app/services',
});

interface SubService {
  _key: string;
  name: string;
  icon: string;
}

interface Service {
  _id: string;
  id: {
    current: string;
  };
  title: string;
  tagline: string;
  icon: string;
  problem: string;
  solution: string;
  benefits: string[];
  bestFor: string;
  subServices: SubService[];
  gradient: string;
  order: number;
}

async function getServices(): Promise<Service[]> {
  const services = await client.fetch<Service[]>(
    `*[_type == "service"] | order(order asc) {
      _id,
      id,
      title,
      tagline,
      icon,
      problem,
      solution,
      benefits,
      bestFor,
      subServices,
      gradient,
      order
    }`,
    {},
    {
      next: { revalidate: 60 }
    }
  );
  return services;
}

const Services = async () => {
  const services = await getServices();

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Our Services</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Digital Solutions for{" "}
              <span className="text-gradient">Business Growth</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We offer comprehensive digital services designed to help your business attract more customers, 
              build credibility, and grow sustainably. Every solution is tailored to your specific goals.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="space-y-24">
            {services.map((service, index) => {
              // Defensive icon lookup with trimming
              const iconKey = service.icon?.trim() || '';
              const ServiceIcon = iconMap[iconKey] || Globe;
              
              return (
              <div
                key={service.id.current}
                id={service.id.current}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start scroll-mt-24 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <ServiceIcon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {service.title}
                  </h2>
                  <p className="text-xl text-accent mb-6">{service.tagline}</p>

                  <div className="space-y-6">
                    <div className="glass-card p-6">
                      <h4 className="font-semibold text-foreground mb-2">The Problem</h4>
                      <p className="text-muted-foreground">{service.problem}</p>
                    </div>
                    <div className="glass-card p-6">
                      <h4 className="font-semibold text-foreground mb-2">Our Solution</h4>
                      <p className="text-muted-foreground">{service.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits & Details */}
                <div className={`glass-card p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h4 className="font-semibold text-foreground mb-4">What You Get</h4>
                  <ul className="space-y-3 mb-8">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-8">
                    <h4 className="font-semibold text-foreground mb-3">Includes</h4>
                    <div className="flex flex-wrap gap-3">
                      {service.subServices.map((sub) => {
                        const subIconKey = sub.icon?.trim() || '';
                        const SubIcon = iconMap[subIconKey] || Code;
                        return (
                          <div key={sub._key} className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-xl text-sm border border-border/50">
                            <SubIcon className="w-4 h-4 text-accent" />
                            <span className="text-foreground">{sub.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-xl mb-6 border border-border/50">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Best for:</strong> {service.bestFor}
                    </p>
                  </div>

                  <Button variant="accent" className="w-full" asChild>
                    <Link href="/contact">
                      Discuss This Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA 
        title="Not Sure Which Service You Need?"
        description="Let's have a conversation about your goals. We'll help you identify the right solution for your business."
        buttonText="Schedule a Free Consultation"
      />
    </Layout>
  );
};

export default Services;
