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

async function addSmitBridgeProject() {
  try {
    console.log('🚀 Creating SmitBridge Global Ventures LLC project...');

    const project = {
      _type: 'project',
      title: 'SmitBridge Global Ventures LLC',
      slug: {
        _type: 'slug',
        current: 'smitbridge-global-ventures',
      },
      category: 'webdev',
      description: 'A comprehensive consulting platform for SmitBridge Global Ventures LLC, showcasing their environmental, agribusiness, immigration, and business advisory services across Nigeria and globally.',
      tags: [
        'Consulting',
        'Web Development',
        'Agribusiness',
        'Environmental Services',
        'Immigration Consulting',
        'Business Advisory',
      ],
      results: [
        'Multi-Service Platform',
        'Global Consulting Presence',
        'Professional Corporate Identity',
      ],
      client: {
        name: 'SmitBridge Global Ventures LLC',
        industry: 'Environmental & Business Consulting',
        location: 'Nigeria (Global Reach)',
        size: 'Consulting Firm',
      },
      challenge:
        'SmitBridge Global Ventures LLC needed a professional digital platform to effectively communicate their diverse range of consulting services including environmental consulting, agribusiness and sustainable farming, immigration services, and business advisory. They required a website that could establish credibility with communities, companies, and governments while showcasing their expertise in helping organizations grow responsibly.',
      solution:
        'We developed a comprehensive corporate website that clearly presents their multi-faceted consulting services. The platform features dedicated sections for each service line - environmental consulting, agribusiness and sustainable farming, immigration services, and business & investment advisory. The design emphasizes professionalism and trust, with clear navigation that helps potential clients understand their capabilities and reach across Nigeria and globally through their partnership network.',
      strategy: [
        'Designed a professional corporate interface suitable for government and enterprise clients',
        'Created clear service categorization for environmental, agribusiness, immigration, and advisory services',
        'Developed content strategy highlighting their expertise in sustainable and responsible growth',
        'Implemented intuitive navigation for diverse client segments (communities, companies, governments)',
        'Showcased their global reach through partnerships',
        'Optimized for credibility and trust-building',
        'Integrated contact forms for multiple service inquiries',
      ],
      services: [
        'Web Development',
        'UI/UX Design',
        'Corporate Website Design',
        'Responsive Design',
        'Content Strategy',
        'SEO Optimization',
      ],
      duration: '8 weeks',
      year: '2024',
      projectUrl: 'https://smitbridgeglobal.com/',
      featured: true,
      order: 3,
    };

    const result = await client.create(project);
    console.log('✅ Project created successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 Project URL:', project.projectUrl);
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Find the "SmitBridge Global Ventures LLC" project');
    console.log('3. Add the main project image');
    console.log('4. (Optional) Add gallery images');
    console.log('5. (Optional) Connect testimonial');
    console.log('6. Publish the project');
  } catch (error) {
    console.error('❌ Error creating project:', error);
    process.exit(1);
  }
}

addSmitBridgeProject();
