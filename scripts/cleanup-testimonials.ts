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

async function cleanupTestimonials() {
  try {
    // IDs to keep
    const keepIds = [
      'M7woOCHH1NDuICF5GWhpVU', // Silk City
      'M7woOCHH1NDuICF5GWhpcu', // AscentLenders
    ];
    const testimonials = await client.fetch(
      `*[_type == "testimonial"]{_id}`
    );
    let deleted = 0;
    for (const t of testimonials) {
      if (!keepIds.includes(t._id)) {
        await client.delete(t._id);
        deleted++;
        console.log('Deleted:', t._id);
      }
    }
    console.log(`\n✅ Deleted ${deleted} testimonials. Only linked testimonials remain.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

cleanupTestimonials();
