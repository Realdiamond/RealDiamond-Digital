import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import { generateSEO } from '@/lib/seo';
import { 
  ArrowRight, 
  Globe, 
  Search, 
  Palette, 
  TrendingUp,

export const metadata = generateSEO({
  title: 'Our Services',
  description: 'Expert web design, development, SEO, and digital marketing services. We create custom solutions that drive growth and deliver measurable ROI for your business.',
  keywords: ['web design services', 'SEO services', 'digital marketing', 'web development', 'ecommerce solutions', 'custom websites'],
  canonical: 'https://realdiamond-digital.vercel.app/services',
});
  CheckCircle,
  Code,
  FileCode,
  BarChart3,
  MapPin,
  Settings,
  Zap,
  Sparkles
} from "lucide-react";

const services = [
  {
    id: "web-development",
    icon: Globe,
    title: "Web Design & Development",
    tagline: "Custom websites that convert visitors into customers",
    problem: "Your website is often the first impression potential customers have of your business. An outdated, slow, or poorly designed website costs you leads and damages your credibility.",
    solution: "We design and build modern, fast-loading websites that communicate your value proposition clearly and guide visitors toward taking action.",
    benefits: [
      "Custom designs tailored to your brand and goals",
      "Mobile-responsive layouts for all devices",
      "Fast loading speeds for better user experience",
      "Conversion-optimized page structures",
      "Easy-to-manage content systems",
    ],
    bestFor: "Businesses ready to invest in a professional online presence that actively generates leads.",
    subServices: [
      { icon: Code, name: "Custom Web Development" },
      { icon: FileCode, name: "WordPress Websites" },
      { icon: Settings, name: "Website Maintenance" },
    ],
    gradient: "from-accent to-cyan-400",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Online Visibility",
    tagline: "Get found by customers actively searching for your services",
    problem: "Without proper SEO, your website is invisible to the people who need your services most. You're losing business to competitors who rank higher in search results.",
    solution: "We implement comprehensive SEO strategies that improve your search rankings, increase organic traffic, and bring qualified leads to your website.",
    benefits: [
      "Higher rankings for your target keywords",
      "Increased organic traffic from search engines",
      "Better visibility in local search results",
      "Improved website structure for search engines",
      "Ongoing optimization and reporting",
    ],
    bestFor: "Businesses wanting sustainable, long-term growth through organic search traffic.",
    subServices: [
      { icon: BarChart3, name: "On-Page SEO" },
      { icon: Settings, name: "Technical SEO" },
      { icon: MapPin, name: "Local SEO" },
    ],
    gradient: "from-accent-secondary to-pink-400",
  },
  {
    id: "design",
    icon: Palette,
    title: "Brand & Visual Design",
    tagline: "Professional design that communicates your value",
    problem: "Inconsistent or amateur visuals undermine your credibility. When your brand looks unprofessional, potential customers question the quality of your services.",
    solution: "We create cohesive visual identities and professional designs that communicate competence, build trust, and make your brand memorable.",
    benefits: [
      "Consistent brand identity across all touchpoints",
      "Professional graphics that build credibility",
      "Designs that communicate your unique value",
      "Visual systems that scale with your business",
      "Marketing materials that convert",
    ],
    bestFor: "Businesses looking to establish or refresh their visual identity for a more professional market position.",
    subServices: [
      { icon: Palette, name: "Logo & Brand Identity" },
      { icon: FileCode, name: "Marketing Materials" },
      { icon: Globe, name: "Social Media Graphics" },
    ],
    gradient: "from-orange-400 to-amber-400",
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "Growth & Optimization",
    tagline: "Continuous improvement for better business results",
    problem: "A website launch is just the beginning. Without ongoing optimization, your site's performance plateaus and you miss opportunities to improve conversion rates.",
    solution: "We implement data-driven optimization strategies that continuously improve your website's performance, user experience, and conversion rates over time.",
    benefits: [
      "Data-driven decisions based on real user behavior",
      "Improved website speed and performance",
      "Higher conversion rates through testing",
      "Regular performance monitoring and reporting",
      "Strategic recommendations for growth",
    ],
    bestFor: "Established businesses ready to maximize the return on their digital investments.",
    subServices: [
      { icon: Zap, name: "Performance Optimization" },
      { icon: BarChart3, name: "Conversion Rate Optimization" },
      { icon: Settings, name: "Website Audits" },
    ],
    gradient: "from-green-400 to-emerald-400",
  },
];

const Services = () => {
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
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-accent-foreground" />
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
                      {service.subServices.map((sub) => (
                        <div key={sub.name} className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-xl text-sm border border-border/50">
                          <sub.icon className="w-4 h-4 text-accent" />
                          <span className="text-foreground">{sub.name}</span>
                        </div>
                      ))}
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
            ))}
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
