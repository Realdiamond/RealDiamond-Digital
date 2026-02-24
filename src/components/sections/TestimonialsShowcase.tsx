"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

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

const TestimonialsShowcase = ({ initialTestimonials }: { initialTestimonials: Testimonial[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonials = initialTestimonials;

  // Calculate total slides (showing 2 at a time)
  const totalSlides = Math.ceil(testimonials.length / 2);

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get current testimonials to show (2 at a time)
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * 2;
    return testimonials.slice(startIndex, startIndex + 2);
  };

  return (
    <section className="py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb bg-orb-2 opacity-10" />
      </div>

      <div className="container-wide relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-accent text-accent" />
            ))}
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Don't Take Our Word for It
          </h2>
          <p className="text-lg text-muted-foreground">
            Here's what our clients say about working with us
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="relative overflow-hidden">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 transition-all duration-500 ease-in-out ${
                isAnimating 
                  ? direction === 'left' 
                    ? 'animate-slide-out-left' 
                    : 'animate-slide-out-right'
                  : 'animate-slide-in'
              }`}
              key={currentSlide}
            >
              {getCurrentTestimonials().map((testimonial) => (
                <div 
                  key={testimonial.author}
                  className="glass-card p-8 relative group hover:shadow-elevated transition-all duration-500"
                >
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                    <Quote className="w-6 h-6 text-accent" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    <blockquote className="text-lg text-foreground leading-relaxed mb-6 min-h-[120px]">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/50">
                      <div>
                        <div className="font-bold text-foreground">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>

                      <div className="px-4 py-2 bg-gradient-to-r from-accent to-accent-secondary rounded-full text-white font-bold text-sm whitespace-nowrap">
                        {testimonial.result}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              <div className="flex gap-2">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'w-8 bg-accent' 
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { value: "50+", label: "Happy Clients" },
            { value: "5.0", label: "Average Rating" },
            { value: "95%", label: "Would Recommend" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsShowcase;
