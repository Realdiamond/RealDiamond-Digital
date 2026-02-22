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

async function addAscentLendersProject() {
  try {
    console.log('🚀 Creating AscentLenders project...');

    const project = {
      _type: 'project',
      title: 'AscentLenders',
      slug: {
        _type: 'slug',
        current: 'ascentlenders',
      },
      category: 'webdev',
      description: 'A comprehensive financial services platform empowering growth in Sub-Saharan Africa through infrastructure finance, business lending, and trade financing solutions.',
      tags: [
        'Fintech',
        'Web Development',
        'Financial Services',
        'Business Lending',
        'Infrastructure Finance',
      ],
      results: [
        'Full-Service Lending Platform',
        'Multi-Service Integration',
        'Professional Financial Portal',
      ],
      client: {
        name: 'Ascent Lending LLC',
        industry: 'Financial Services',
        location: 'Sub-Saharan Africa',
        size: 'Enterprise',
      },
      challenge:
        'Ascent Lending LLC needed a robust digital platform to showcase their diverse financial services including consumer lending, business lending, infrastructure finance, and cross-border trade financing. They required a professional, trustworthy online presence that could effectively communicate their services to various stakeholders including private sponsors, institutional investors, and borrowers across Sub-Saharan Africa.',
      solution:
        'We developed a comprehensive web platform that clearly presents their full range of financial services. The website features detailed service pages for consumer lending, business lending, infrastructure projects, and trade financing, with a professional design that builds trust and credibility. The platform is optimized for performance and accessibility, ensuring seamless access for users across different regions and devices.',
      strategy: [
        'Designed a professional, trust-building interface suitable for financial services',
        'Created clear service categorization for consumer, business, and infrastructure lending',
        'Implemented intuitive navigation for diverse user segments',
        'Developed content strategy highlighting their expertise in African markets',
        'Optimized for performance across various network conditions',
        'Integrated blog functionality for financial insights and company updates',
        'Ensured mobile responsiveness for on-the-go access',
      ],
      services: [
        'Web Development',
        'UI/UX Design',
        'Financial Platform Design',
        'Responsive Design',
        'Content Strategy',
        'SEO Optimization',
      ],
      testimonial: {
        quote:
          'The platform perfectly represents our diverse financial services and has enhanced our professional presence across Sub-Saharan Africa.',
        author: 'AscentLenders Team',
        role: 'Management',
      },
      duration: '10 weeks',
      year: '2024',
      projectUrl: 'https://ascentlenders.com',
      featured: true,
      order: 1,
    };

    const result = await client.create(project);
    console.log('✅ Project created successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 Project URL:', project.projectUrl);
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Find the "AscentLenders" project');
    console.log('3. Add the main project image');
    console.log('4. (Optional) Add gallery images');
    console.log('5. (Optional) Connect a testimonial from your testimonials collection');
    console.log('6. Publish the project');
  } catch (error) {
    console.error('❌ Error creating project:', error);
    process.exit(1);
  }
}

addAscentLendersProject();
