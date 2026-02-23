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

async function addLionsClubTestimonial() {
  try {
    console.log('🚀 Creating testimonial from Lions Club District 404A4 Management...');

    // First, find the Lions Club project
    const projectQuery = `*[_type == "project" && slug.current == "lions-club-district-404a4-nigeria"][0]{ _id }`;
    const project = await client.fetch(projectQuery);

    if (!project) {
      console.log('⚠️  Lions Club project not found. Creating testimonial without project reference...');
    } else {
      console.log('✅ Found Lions Club project:', project._id);
    }

    // Create the testimonial
    const testimonial = {
      _type: 'testimonial',
      type: 'text',
      quote:
        'Excellent work on our district website! The platform effectively connects our multiple clubs and showcases our humanitarian initiatives across Nigeria. The website has greatly improved our coordination and visibility in the community. Professional delivery and great attention to our organizational needs.',
      author: 'District Management Team',
      role: 'District Leadership',
      company: 'Lions Club District 404A4 Nigeria',
      rating: 5,
      featured: false,
      showOnHomepage: false,
      order: 10,
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
    console.log('2. Find the testimonial from "District Management Team"');
    console.log('3. (Optional) Add a photo or logo');
    console.log('4. Publish the testimonial');

    // Link testimonial to project if project exists
    if (project) {
      console.log('\n🔗 Linking testimonial to Lions Club project...');
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

addLionsClubTestimonial();
