'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from './ui/button';

interface VideoTestimonial {
  _id: string;
  author: string;
  company?: string;
  role?: string;
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
}

interface VideoTestimonialCarouselProps {
  testimonials: VideoTestimonial[];
}

export function VideoTestimonialCarousel({ testimonials }: VideoTestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1 
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
      onSelect();
    }
  }, [emblaApi, onSelect]);

  const handlePlayVideo = (testimonialId: string) => {
    setPlayingVideo(testimonialId);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((testimonial) => {
            const isPlaying = playingVideo === testimonial._id;
            const videoUrl = testimonial.videoSource === 'youtube' 
              ? testimonial.videoUrl 
              : testimonial.videoFile?.asset?.url;
            const thumbnailUrl = testimonial.videoThumbnail?.asset?.url;

            return (
              <div 
                key={testimonial._id} 
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div className="glass-card overflow-hidden group">
                  <div className="relative aspect-video bg-secondary/30">
                    {!isPlaying ? (
                      <>
                        {thumbnailUrl && (
                          <img 
                            src={thumbnailUrl} 
                            alt={testimonial.videoTitle || `${testimonial.author} testimonial`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors cursor-pointer"
                          onClick={() => handlePlayVideo(testimonial._id)}
                        >
                          <div className="w-16 h-16 rounded-full bg-accent/90 hover:bg-accent flex items-center justify-center transition-all transform group-hover:scale-110">
                            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                          </div>
                        </div>

                        {testimonial.videoDuration && (
                          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-white text-xs font-medium">
                            {testimonial.videoDuration}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full">
                        {testimonial.videoSource === 'youtube' && testimonial.videoUrl ? (
                          <iframe
                            src={getYouTubeEmbedUrl(testimonial.videoUrl)}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : testimonial.videoFile?.asset?.url ? (
                          <video
                            src={testimonial.videoFile.asset.url}
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                          />
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {testimonial.author}
                    </h3>
                    {(testimonial.role || testimonial.company) && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                        {testimonial.role && testimonial.company && ', '}
                        {testimonial.company}
                      </p>
                    )}
                    {testimonial.videoTitle && !isPlaying && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {testimonial.videoTitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {testimonials.length > 3 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:flex"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:flex"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex 
                  ? 'w-8 bg-accent' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
