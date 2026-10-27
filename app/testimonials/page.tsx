import { Star } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { VideoTestimonialCarousel } from '@/components/VideoTestimonialCarousel';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/layout/PageHeader';
import CTA from '@/components/sections/CTA';
import { generateSEO } from '@/lib/seo';
import { CMS_REVALIDATE, docTag, listTag } from '@/lib/cms-cache';

export const metadata = generateSEO({
  title: 'Client Testimonials',
  description: 'Hear from our satisfied clients. Real results and testimonials from businesses we have helped grow.',
  keywords: ['client testimonials', 'reviews', 'case results', 'digital agency feedback'],
  canonical: 'https://realdiamonddigital.studio/testimonials',
});

// Time-based ISR (60s) + on-demand revalidation via webhook
export const revalidate = 1800;

// Define types
interface TestimonialData {
  _id: string;
  type: 'text' | 'video';
  author: string;
  company?: string;
  role?: string;
  quote?: string;
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
    `*[_type == "testimonial" && type == "text"] | order(coalesce(order, 999) asc) {
      _id,
      type,
      author,
      company,
      role,
      quote,
      rating,
      "image": image.asset->{url},
      order
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.testimonial,
        tags: [docTag('testimonial'), listTag('testimonial')],
      }
    }
  );

  const videoTestimonials = await client.fetch<TestimonialData[]>(
    `*[_type == "testimonial" && type == "video"] | order(coalesce(order, 999) asc) {
      _id,
      type,
      author,
      company,
      role,
      videoSource,
      videoUrl,
      "videoFile": videoFile.asset->{url},
      "videoThumbnail": videoThumbnail.asset->{url},
      videoDuration,
      videoTitle,
      order
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.testimonial,
        tags: [docTag('testimonial'), listTag('testimonial')],
      }
    }
  );

  return { textTestimonials, videoTestimonials };
}

export default async function TestimonialsPage() {
  const { textTestimonials, videoTestimonials } = await getTestimonials();

  const ratings = textTestimonials.map((t) => t.rating).filter((r): r is number => typeof r === "number");
  const average = ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : null;

  return (
    <Layout>
      <PageHeader
        eyebrow="Testimonials"
        title="What clients say."
        note={average ? `${average.toFixed(1)} average · ${ratings.length} reviews` : undefined}
        description="Every review here comes from a real client project. Read the work behind them in the case studies."
      />

      {videoTestimonials && videoTestimonials.length > 0 && (
        <section className="pb-16">
          <div className="container-wide">
            <div className="bp-heading mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Video testimonials</h2>
            </div>
            <VideoTestimonialCarousel testimonials={videoTestimonials} />
          </div>
        </section>
      )}

      {textTestimonials && textTestimonials.length > 0 && (
        <section className="pb-8">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-6">
              {textTestimonials.map((testimonial) => (
                <figure key={testimonial._id} className="bp-panel p-7 sm:p-9 flex flex-col justify-between gap-8">
                  <div>
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-5" aria-label={`${testimonial.rating} out of 5 stars`}>
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-annotation" aria-hidden="true" />
                        ))}
                      </div>
                    )}
                    <blockquote className="text-lg sm:text-xl leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  </div>
                  <figcaption className="flex items-center gap-4 pt-6 border-t border-border">
                    {testimonial.image?.asset?.url && (
                      <img src={testimonial.image.asset.url} alt="" className="w-11 h-11 object-cover grayscale" />
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="font-mono text-xs text-muted-foreground mt-1">
                        {testimonial.role}
                        {testimonial.role && testimonial.company && " · "}
                        {testimonial.company}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {(!textTestimonials || textTestimonials.length === 0) &&
        (!videoTestimonials || videoTestimonials.length === 0) && (
          <section className="pb-16">
            <div className="container-wide">
              <p className="text-muted-foreground text-lg">No testimonials yet. Check back soon.</p>
            </div>
          </section>
        )}

      <CTA
        title="Let's make you the next review."
        description="Tell me about your project and what success looks like for you. I reply to every enquiry within 24 hours."
      />
    </Layout>
  );
}
