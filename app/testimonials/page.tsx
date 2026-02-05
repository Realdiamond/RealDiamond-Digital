import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Quote, Play, Sparkles } from "lucide-react";

const testimonials = [
  {
    quote: "RealDiamond Digital transformed our online presence completely. Our website now converts at 3x the rate of our old site, and we're ranking on the first page for our key terms.",
    author: "Sarah Mitchell",
    role: "CEO, TechStart Solutions",
    rating: 5,
    type: "text",
  },
  {
    quote: "Working with the team felt like having an in-house digital department. They understood our business goals and delivered a website that truly represents our brand.",
    author: "James Rodriguez",
    role: "Founder, GreenLeaf Consulting",
    rating: 5,
    type: "text",
  },
  {
    quote: "The strategic approach they brought to our SEO was game-changing. We've seen a 200% increase in organic traffic within six months.",
    author: "Emily Chen",
    role: "Marketing Director, Urban Developments",
    rating: 5,
    type: "text",
  },
  {
    quote: "From the first meeting, they understood exactly what we needed. The results speak for themselves - our bookings have increased by 250%.",
    author: "Michael Torres",
    role: "Owner, FitLife Studios",
    rating: 5,
    type: "text",
  },
  {
    quote: "Professional, responsive, and truly invested in our success. RealDiamond Digital delivered a website that has become our most powerful marketing tool.",
    author: "Amanda Foster",
    role: "Partner, Legal Partners LLP",
    rating: 5,
    type: "text",
  },
  {
    quote: "The ROI on our website redesign was phenomenal. We saw a complete transformation in how customers perceive our brand online.",
    author: "David Kim",
    role: "CEO, Artisan Bakery Co.",
    rating: 5,
    type: "text",
  },
];

const videoTestimonials = [
  {
    title: "How RealDiamond Digital Helped Us 3x Our Conversions",
    author: "Sarah Mitchell",
    role: "CEO, TechStart Solutions",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    duration: "2:45",
  },
  {
    title: "Our SEO Success Story with RealDiamond Digital",
    author: "Emily Chen",
    role: "Marketing Director, Urban Developments",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
    duration: "3:12",
  },
  {
    title: "From Startup to Industry Leader: Our Digital Journey",
    author: "James Rodriguez",
    role: "Founder, GreenLeaf Consulting",
    thumbnail: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop",
    duration: "4:08",
  },
];

const TestimonialsPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Client Success</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              What Our <span className="text-gradient">Clients Say</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Don't just take our word for it. Hear from the businesses we've helped grow 
              through strategic digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Video <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Watch our clients share their experiences working with RealDiamond Digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((video, index) => (
              <div
                key={video.title}
                className="glass-card-hover overflow-hidden group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.author}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center group-hover:bg-background/40 transition-colors">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-secondary rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-accent-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2 py-1 glass-card text-xs font-medium text-foreground">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {video.author} • {video.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Client <span className="text-gradient">Reviews</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="glass-card-hover p-8 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border/50 pt-6">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100%", label: "Client Satisfaction" },
              { value: "50+", label: "Happy Clients" },
              { value: "5.0", label: "Average Rating" },
              { value: "95%", label: "Client Retention" },
            ].map((stat) => (
              <div key={stat.label} className="text-center glass-card p-8">
                <div className="font-heading text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Join Our <span className="text-gradient">Success Stories?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Let's discuss how we can help you achieve similar results for your business.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TestimonialsPage;
