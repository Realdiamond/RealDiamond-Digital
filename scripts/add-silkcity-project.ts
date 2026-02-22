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

async function addSilkCityProject() {
  try {
    console.log('🚀 Creating Silk City Land and Homes project...');

    const project = {
      _type: 'project',
      title: 'Silk City Land and Homes',
      slug: {
        _type: 'slug',
        current: 'silk-city-land-and-homes',
      },
      category: 'web',
      description: 'A modern real estate website built for Silk City Land and Homes, showcasing premium properties and land investments across Africa.',
      tags: [
        'Real Estate',
        'Web Design',
        'Property Listings',
        'Responsive Design',
        'Modern UI',
      ],
      results: [
        'Modern Property Showcase',
        'Mobile-Responsive Design',
        'Professional Brand Presence',
      ],
      client: {
        name: 'Silk City Land and Homes',
        industry: 'Real Estate',
        location: 'Africa',
        size: 'Growing Enterprise',
      },
      challenge:
        'Silk City Land and Homes needed a professional online presence to showcase their premium property portfolio and attract potential investors and buyers across Africa. They required a modern, user-friendly platform that could effectively display property listings and build trust with their target audience.',
      solution:
        'We designed and developed a sleek, modern website that emphasizes visual appeal and user experience. The platform features an intuitive property browsing system, engaging visuals, and clear calls-to-action that guide visitors through the property discovery journey. The responsive design ensures seamless access across all devices.',
      strategy: [
        'Conducted market research to understand the African real estate digital landscape',
        'Created a visually appealing design that showcases properties effectively',
        'Implemented responsive layouts for optimal mobile and desktop experience',
        'Developed clear navigation and property categorization system',
        'Integrated contact forms for lead generation',
        'Optimized for fast loading speeds and SEO performance',
      ],
      services: [
        'Web Design',
        'Web Development',
        'UI/UX Design',
        'Responsive Design',
        'SEO Optimization',
        'Content Strategy',
      ],
      testimonial: {
        quote:
          'The website exceeded our expectations. It perfectly captures our brand and makes it easy for clients to explore our properties.',
        author: 'Silk City Team',
        role: 'Management',
      },
      duration: '8 weeks',
      year: '2024',
      projectUrl: 'https://silkcitylandsandhomes.africa/',
      featured: true,
      order: 0,
    };

    const result = await client.create(project);
    console.log('✅ Project created successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 Project URL:', project.projectUrl);
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Find the "Silk City Land and Homes" project');
    console.log('3. Add the main project image');
    console.log('4. (Optional) Add gallery images');
    console.log('5. Publish the project');
  } catch (error) {
    console.error('❌ Error creating project:', error);
    process.exit(1);
  }
}

addSilkCityProject();
