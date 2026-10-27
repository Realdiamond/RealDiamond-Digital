import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  result: string;
  rating: number;
}

interface TestimonialStats {
  reviewCount: number;
  averageRating: number | null;
}

const TestimonialsShowcase = ({
  initialTestimonials,
  stats,
}: {
  initialTestimonials: Testimonial[];
  stats: TestimonialStats;
}) => {
  const testimonials = initialTestimonials.slice(0, 4);

  return (
    <section className="py-16 lg:py-24" aria-labelledby="testimonials-title">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="bp-heading">
            <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold">
              What clients say
            </h2>
            {stats.averageRating && (
              <span className="bp-note">
                {stats.averageRating.toFixed(1)} average · {stats.reviewCount} reviews
              </span>
            )}
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 font-semibold text-accent hover:gap-3 transition-all"
          >
            All reviews
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial._id}
              className={`p-7 sm:p-10 flex flex-col justify-between gap-10 ${
                index === 0 ? "bg-foreground text-background" : "bp-panel"
              }`}
            >
              <div>
                <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-annotation" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-xl sm:text-2xl leading-snug tracking-tight">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className={`font-mono text-xs mt-1 ${index === 0 ? "text-background/70" : "text-muted-foreground"}`}>
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
                {testimonial.result && (
                  <span
                    className={`font-mono text-xs px-2.5 py-1.5 border ${
                      index === 0 ? "border-background/30 text-background/85" : "border-annotation text-annotation-ink"
                    }`}
                  >
                    {testimonial.result}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsShowcase;
