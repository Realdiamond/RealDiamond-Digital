import Link from "next/link";
import { Globe, Search, Palette, Zap, ArrowRight, ShoppingCart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";

async function getServices() {
  const services = await client.fetch(`
    *[_type == "service" && featured == true] | order(coalesce(order, 999) asc) {
      _id,
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
    }
  `);
  return services;
}

const iconMap: any = {
  "globe": Globe,
  "search": Search,
  "palette": Palette,
  "zap": Zap,
  "shopping-cart": ShoppingCart,
  "trending-up": TrendingUp,
};

// Fallback gradients for services
const gradientMap: any = {
  "Web Design & Development": "from-blue-500 to-cyan-500",
  "Search Engine Optimization": "from-green-500 to-emerald-500",
  "Brand & Visual Design": "from-purple-500 to-pink-500",
  "E-commerce Solutions": "from-orange-500 to-red-500",
};

const getServiceGradient = (title: string, gradient: string) => {
  // If gradient is empty, white, or not set, use fallback
  if (!gradient || gradient.includes('white') || gradient.trim() === '') {
    return gradientMap[title] || 'from-accent to-accent-secondary';
  }
  return gradient;
}; 

export default async function ServicesGrid() {
  const services = await getServices();

  return (
    <section className="py-32 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      <div className="container-wide relative">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Dominate Your Local Market</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Websites, SEO, and lead systems built specifically for service businesses. Get more calls, fill your schedule, and grow your revenue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service: any, index: number) => {
            const IconComponent = iconMap[service.icon] || Globe;
            const serviceGradient = getServiceGradient(service.title, service.gradient);
            
            return (
              <div
                key={service._id}
                className="group relative glass-card p-8 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${serviceGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg bg-gradient-to-br ${serviceGradient}`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.tagline || service.solution}
                  </p>

                  {/* Features List */}
                  {service.subServices && service.subServices.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.subServices.slice(0, 4).map((feature: string) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded-lg border border-border/50"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className={`w-full h-full bg-gradient-to-br ${serviceGradient} rounded-full blur-3xl`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Not sure what you need? Let's figure it out together.
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-accent to-accent-secondary text-white font-bold">
            <Link href="/contact">
              Schedule a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
