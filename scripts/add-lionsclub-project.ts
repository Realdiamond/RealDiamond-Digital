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

async function addLionsClubProject() {
  try {
    console.log('🚀 Creating Lions Club District 404A4 project...');

    const project = {
      _type: 'project',
      title: 'Lions Club District 404A4 Nigeria',
      slug: {
        _type: 'slug',
        current: 'lions-club-district-404a4-nigeria',
      },
      category: 'web',
      description: 'A comprehensive district website for Lions Club District 404A4 Nigeria, connecting multiple clubs and coordinating humanitarian service initiatives across the region.',
      tags: [
        'Non-Profit',
        'Web Design',
        'Community Organization',
        'Humanitarian Services',
        'District Portal',
      ],
      results: [
        'Unified District Portal',
        'Enhanced Club Coordination',
        'Professional Service Organization Presence',
      ],
      client: {
        name: 'Lions Club District 404A4',
        industry: 'Non-Profit / Humanitarian Services',
        location: 'Nigeria',
        size: 'Multi-Club District Organization',
      },
      challenge:
        'Lions Club District 404A4 Nigeria needed a centralized digital platform to coordinate activities across multiple Lions clubs in their district. They required a professional website to showcase their humanitarian work, facilitate communication between clubs, publish district news and events, and provide resources for members across the region.',
      solution:
        'We developed a comprehensive district website that serves as the central hub for all clubs within District 404A4. The platform features sections for district leadership, club directories, event calendars, news updates, and service project showcases. The design reflects the prestigious Lions International brand while providing easy navigation for members and the public to learn about their impactful community service initiatives.',
      strategy: [
        'Created a structured information architecture for district-level organization',
        'Designed intuitive navigation for clubs, events, and service projects',
        'Implemented responsive design for accessibility across devices',
        'Developed content sections for leadership, membership, and community impact',
        'Integrated event calendar and news update functionality',
        'Ensured brand consistency with Lions International guidelines',
        'Optimized for community engagement and member resources',
      ],
      services: [
        'Web Design',
        'Web Development',
        'UI/UX Design',
        'Responsive Design',
        'Content Strategy',
        'Organization Portal',
      ],
      duration: '7 weeks',
      year: '2023',
      featured: false,
      order: 10,
    };

    const result = await client.create(project);
    console.log('✅ Project created successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 Previous URL: lionsclubsd404a4.org (no longer active)');
    console.log('📋 Display Order:', project.order);
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Find the "Lions Club District 404A4 Nigeria" project');
    console.log('3. Add the main project image');
    console.log('4. (Optional) Add gallery images');
    console.log('5. (Optional) Connect testimonial from Management');
    console.log('6. Publish the project');
  } catch (error) {
    console.error('❌ Error creating project:', error);
    process.exit(1);
  }
}

addLionsClubProject();
