import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function listTestimonials() {
  try {
    const testimonials = await client.fetch(
      `*[_type == "testimonial"]{_id, quote, author, company}`
    );
    console.log('\n📋 All Testimonials in Database:\n');
    testimonials.forEach((t: any) => {
      console.log(`- ${t.author} (${t.company})`);
      console.log(`  ID: ${t._id}`);
      console.log(`  Quote: ${t.quote}`);
      console.log('');
    });
    console.log(`Total: ${testimonials.length} testimonials\n`);
  } catch (error) {
    console.error('Error:', error);
  }
}

listTestimonials();
