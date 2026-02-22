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

async function addProjectTestimonials() {
  try {
    console.log('🚀 Creating testimonials for projects...\n');

    // 1. Create Silk City testimonial
    const silkCityTestimonial = {
      _type: 'testimonial',
      quote: 'The website exceeded our expectations. It perfectly captures our brand and makes it easy for clients to explore our properties. The modern design has significantly enhanced our online presence.',
      author: 'Silk City Management',
      role: 'Business Owner',
      company: 'Silk City Land and Homes',
      rating: 5,
      type: 'text',
      result: 'Professional Online Presence',
    };

    const silkCityTestimonialResult = await client.create(silkCityTestimonial);
    console.log('✅ Created Silk City testimonial:', silkCityTestimonialResult._id);

    // 2. Create AscentLenders testimonial
    const ascentTestimonial = {
      _type: 'testimonial',
      quote: 'The platform perfectly represents our diverse financial services and has enhanced our professional presence across Sub-Saharan Africa. Our clients now have seamless access to all our lending solutions.',
      author: 'AscentLenders Leadership',
      role: 'Executive Team',
      company: 'Ascent Lending LLC',
      rating: 5,
      type: 'text',
      result: 'Enhanced Digital Presence',
    };

    const ascentTestimonialResult = await client.create(ascentTestimonial);
    console.log('✅ Created AscentLenders testimonial:', ascentTestimonialResult._id);

    // 3. Find and update the projects
    console.log('\n🔍 Finding projects to update...');

    const silkCityProject = await client.fetch(
      `*[_type == "project" && slug.current == "silk-city-lands-and-homes"][0]{_id}`
    );

    if (silkCityProject) {
      // Remove 'drafts.' prefix if present
      const projectId = silkCityProject._id.replace('drafts.', '');
      await client
        .patch(projectId)
        .set({
          testimonial: {
            _type: 'reference',
            _ref: silkCityTestimonialResult._id,
          },
        })
        .commit();
      console.log('✅ Updated Silk City project with testimonial');
    } else {
      console.log('⚠️  Silk City project not found');
    }

    const ascentProject = await client.fetch(
      `*[_type == "project" && slug.current == "ascentlenders"][0]{_id}`
    );

    if (ascentProject) {
      // Remove 'drafts.' prefix if present
      const projectId = ascentProject._id.replace('drafts.', '');
      await client
        .patch(projectId)
        .set({
          testimonial: {
            _type: 'reference',
            _ref: ascentTestimonialResult._id,
          },
        })
        .commit();
      console.log('✅ Updated AscentLenders project with testimonial');
    } else {
      console.log('⚠️  AscentLenders project not found');
    }

    console.log('\n🎉 All done!');
    console.log('📝 Next steps:');
    console.log('1. Go to Sanity Studio');
    console.log('2. Check the Projects - testimonials should be linked');
    console.log('3. Check Testimonials collection - new testimonials should be there');
    console.log('4. Add images to the projects and publish!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addProjectTestimonials();
