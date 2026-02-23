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

async function addSmitBridgeTestimonial() {
  try {
    console.log('🚀 Creating testimonial for SmitBridge Global Ventures...');

    // First, find the SmitBridge project
    const projectQuery = `*[_type == "project" && slug.current == "smitbridge-global-ventures"][0]{ _id }`;
    const project = await client.fetch(projectQuery);

    if (!project) {
      console.log('⚠️  SmitBridge project not found. Creating testimonial without project reference...');
    } else {
      console.log('✅ Found SmitBridge project:', project._id);
    }

    // Create the testimonial
    const testimonial = {
      _type: 'testimonial',
      type: 'text',
      quote:
        'Outstanding work on our corporate website! The platform beautifully showcases our diverse consulting services - from environmental solutions to agribusiness and immigration. The professional design has significantly enhanced our credibility with government and corporate clients. Excellent attention to detail and understanding of our multi-service business model.',
      author: 'SmitBridge Management',
      role: 'Executive Team',
      company: 'SmitBridge Global Ventures LLC',
      rating: 5,
      featured: true,
      showOnHomepage: true,
      order: 4,
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
    console.log('2. Find the testimonial from "SmitBridge Management"');
    console.log('3. (Optional) Add a photo or company logo');
    console.log('4. Publish the testimonial');

    // Link testimonial to project if project exists
    if (project) {
      console.log('\n🔗 Linking testimonial to SmitBridge project...');
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

addSmitBridgeTestimonial();
