import { Metadata } from 'next';
import { Star, Quote, Sparkles, ArrowRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { VideoTestimonialCarousel } from '@/components/VideoTestimonialCarousel';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Client Testimonials | RealDiamond Digital',
  description: 'Hear from our satisfied clients. Real results, real testimonials from businesses we\'ve helped grow.',
};

// Define types
interface TestimonialData {
  _id: string;
  type: 'text' | 'video';
  name: string;
  company?: string;
  position?: string;
  content?: string;
  rating?: number;
  image?: {
    asset: {
      url: string;
    };
  };
  videoSource?: 'youtube' | 'upload';
  videoUrl?: string;
  videoFile?: {
    asset: {
      url: string;
    };
  };
  videoThumbnail?: {
    asset: {
      url: string;
    };
  };
  videoDuration?: string;
  videoTitle?: string;
  order?: number;
}

// Fetch testimonials from Sanity
async function getTestimonials() {
  const textTestimonials = await client.fetch<TestimonialData[]>(
    `*[_type == "testimonial" && type == "text"] | order(order asc) {
      _id,
      type,
      name,
      company,
      position,
      content,
      rating,
      "image": image.asset->{url},
      order
    }`
  );

  const videoTestimonials = await client.fetch<TestimonialData[]>(
    `*[_type == "testimonial" && type == "video"] | order(order asc) {
      _id,
      type,
      name,
      company,
      position,
      videoSource,
      videoUrl,
      "videoFile": videoFile.asset->{url},
      "videoThumbnail": videoThumbnail.asset->{url},
      videoDuration,
      videoTitle,
      order
    }`
  );

  return { textTestimonials, videoTestimonials };
}

export default async function TestimonialsPage() {
  const { textTestimonials, videoTestimonials } = await getTestimonials();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background relative overflow-hidden">
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

      {/* Video Testimonials Section */}
      {videoTestimonials && videoTestimonials.length > 0 && (
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

            <VideoTestimonialCarousel testimonials={videoTestimonials} />
          </div>
        </section>
      )}

      {/* Text Testimonials Grid */}
      {textTestimonials && textTestimonials.length > 0 && (
        <section className="py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {textTestimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="glass-card-hover p-8 relative"
                >
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />

                  {/* Rating */}
                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 relative z-10 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    {testimonial.image?.asset?.url && (
                      <img
                        src={testimonial.image.asset.url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position}
                        {testimonial.position && testimonial.company && ', '}
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {(!textTestimonials || textTestimonials.length === 0) && 
       (!videoTestimonials || videoTestimonials.length === 0) && (
        <section className="py-20">
          <div className="container-wide text-center">
            <p className="text-muted-foreground text-lg">
              No testimonials available yet. Check back soon!
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30 border-t border-border/50">
        <div className="container-wide">
          <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Join Our <span className="text-gradient">Success Stories?</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                Let's discuss how we can help your business achieve the same remarkable 
                results our clients are experiencing.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
