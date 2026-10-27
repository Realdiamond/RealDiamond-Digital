import { client } from "@/sanity/lib/client";
import TestimonialsShowcase from "./TestimonialsShowcase";

async function getTestimonials() {
  const data = await client.fetch(
    `{
      "testimonials": *[_type == "testimonial" && featured == true] | order(coalesce(order, 999) asc) {
        _id,
        quote,
        author,
        role,
        company,
        "image": image.asset->url,
        result,
        rating
      },
      "reviewCount": count(*[_type == "testimonial"]),
      "averageRating": math::avg(*[_type == "testimonial" && defined(rating)].rating)
    }`,
    {},
    {
      next: { revalidate: 1800 } // 30 minutes - testimonials change rarely
    }
  );
  return data;
}

export default async function TestimonialsShowcaseWrapper() {
  const { testimonials, reviewCount, averageRating } = await getTestimonials();
  return (
    <TestimonialsShowcase
      initialTestimonials={testimonials}
      stats={{ reviewCount, averageRating }}
    />
  );
}
