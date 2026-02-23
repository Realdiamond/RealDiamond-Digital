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

async function addPotteryTestimonial() {
  try {
    // Create testimonial
    const potteryTestimonial = {
      _type: 'testimonial',
      quote: 'The custom WordPress site and SEO work delivered by Diamond Works has transformed our business. We now rank #1 for our most important keywords and our online sales have doubled.',
      author: 'Tolu A.',
      role: 'Owner',
      company: 'Pottery by Tolu',
      rating: 5,
      type: 'text',
      result: 'Doubled Online Sales',
    };
    const potteryResult = await client.create(potteryTestimonial);
    console.log('✅ Created Pottery by Tolu testimonial:', potteryResult._id);

    // Link to project
    const potteryProject = await client.fetch(
      `*[_type == "project" && slug.current == "pottery-by-tolu"][0]{_id}`
    );
    if (potteryProject) {
      await client
        .patch(potteryProject._id)
        .set({
          testimonial: {
            _type: 'reference',
            _ref: potteryResult._id,
          },
        })
        .commit();
      console.log('✅ Linked testimonial to Pottery by Tolu project');
    } else {
      console.log('⚠️  Pottery by Tolu project not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

addPotteryTestimonial();
