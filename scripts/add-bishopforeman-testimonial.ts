import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function addBishopForemanTestimonial() {
  try {
    console.log('🚀 Creating testimonial from Bishop Foreman...');

    // First, find the Harvest Church project
    const projectQuery = `*[_type == "project" && slug.current == "harvest-church-website"][0]{ _id }`;
    const project = await client.fetch(projectQuery);

    if (!project) {
      console.log('⚠️  Harvest Church project not found. Creating testimonial without project reference...');
    } else {
      console.log('✅ Found Harvest Church project:', project._id);
    }

    // Create the testimonial
    const testimonial = {
      _type: 'testimonial',
      type: 'text',
      quote:
        'Timilehin did an EXCEPTIONAL job on our website, paying great attention to details and exceeding all my expectations. Working with him was a breeze thanks to his proactive communication and politeness. Highly recommend!',
      author: 'Bishop Foreman',
      role: 'Senior Pastor',
      company: 'Harvest Church',
      rating: 5,
      featured: true,
      showOnHomepage: true,
      order: 3,
      projectReference: project ? {
        _type: 'reference',
        _ref: project._id,
      } : undefined,
    };

    const result = await client.create(testimonial);
    console.log('✅ Testimonial created successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('⭐ Rating: 5 stars');
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Find the testimonial from "Bishop Foreman"');
    console.log('3. (Optional) Add a photo of Bishop Foreman');
    console.log('4. Publish the testimonial');

    // Link testimonial to project if project exists
    if (project) {
      console.log('\n🔗 Linking testimonial to Harvest Church project...');
      await client
        .patch(project._id)
        .set({
          testimonials: [
            {
              _type: 'reference',
              _ref: result._id,
              _key: `testimonial-${Date.now()}`,
            },
          ],
        })
        .commit();
      console.log('✅ Testimonial linked to project!');
    }
  } catch (error) {
    console.error('❌ Error creating testimonial:', error);
    process.exit(1);
  }
}

addBishopForemanTestimonial();
