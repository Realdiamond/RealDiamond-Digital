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

async function listProjectsWithTestimonials() {
  try {
    const projects = await client.fetch(
      `*[_type == "project"]{_id, title, "slug": slug.current, testimonial}`
    );
    console.log('\n📋 Projects and their testimonials:\n');
    projects.forEach((p: any) => {
      console.log(`- ${p.title}`);
      console.log(`  Slug: ${p.slug}`);
      if (p.testimonial && p.testimonial._ref) {
        console.log(`  Testimonial: ${p.testimonial._ref}`);
      } else {
        console.log('  Testimonial: None');
      }
      console.log('');
    });
    console.log(`Total: ${projects.length} projects\n`);
  } catch (error) {
    console.error('Error:', error);
  }
}

listProjectsWithTestimonials();
