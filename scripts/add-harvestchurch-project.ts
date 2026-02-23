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

async function addHarvestChurchProject() {
  try {
    console.log('🚀 Creating Harvest Church website project...');

    const project = {
      _type: 'project',
      title: 'Harvest Church Website',
      slug: {
        _type: 'slug',
        current: 'harvest-church-website',
      },
      category: 'web',
      description: 'A modern, engaging church website built for Harvest Church and Bishop Foreman, designed to connect the congregation and share the church\'s mission online.',
      tags: [
        'Church Website',
        'Web Design',
        'Religious Organization',
        'Community Platform',
        'Modern Design',
      ],
      results: [
        'Professional Church Presence',
        'Enhanced Community Engagement',
        'Modern & Accessible Design',
      ],
      client: {
        name: 'Harvest Church',
        industry: 'Religious Organization',
        location: 'United States',
        size: 'Community Organization',
      },
      challenge:
        'Harvest Church, led by Bishop Foreman, needed a modern digital platform to connect with their congregation and reach new members. They required a welcoming, professional website that could effectively communicate their mission, host sermons and events, and provide an accessible online presence for their community.',
      solution:
        'We developed a warm and inviting church website that reflects Harvest Church\'s values and mission. The platform features an intuitive design with easy navigation for sermons, events, and ministry information. Special attention was given to accessibility and user experience, ensuring all members of the congregation can easily engage with the content regardless of their technical proficiency.',
      strategy: [
        'Designed a welcoming interface that reflects the church\'s warm community spirit',
        'Created clear navigation for sermons, events, and ministry information',
        'Implemented responsive design for mobile and tablet accessibility',
        'Developed content structure for regular updates and announcements',
        'Optimized for fast loading and reliable performance',
        'Ensured accessibility standards for diverse congregation needs',
        'Integrated event calendar and sermon archive functionality',
      ],
      services: [
        'Web Design',
        'Web Development',
        'UI/UX Design',
        'Responsive Design',
        'Content Strategy',
        'Accessibility Optimization',
      ],
      duration: '6 weeks',
      year: '2024',
      projectUrl: 'https://harvestchurch.vonza.com/',
      featured: true,
      order: 2,
    };

    const result = await client.create(project);
    console.log('✅ Project created successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 Project URL:', project.projectUrl);
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Find the "Harvest Church Website" project');
    console.log('3. Add the main project image');
    console.log('4. (Optional) Add gallery images');
    console.log('5. (Optional) Connect the testimonial from Bishop Foreman');
    console.log('6. Publish the project');
  } catch (error) {
    console.error('❌ Error creating project:', error);
    process.exit(1);
  }
}

addHarvestChurchProject();
