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

async function addBTOGlobalProject() {
  try {
    console.log('🚀 Creating BTO Global Foundation project...');

    const project = {
      _type: 'project',
      title: 'BTO Global Foundation',
      slug: {
        _type: 'slug',
        current: 'bto-global-foundation',
      },
      category: 'web',
      description: 'A mission-driven website for BTO Global Foundation, showcasing their innovative Waste-to-Wealth programs that empower youth and women through recycling, composting, and creative waste reuse initiatives.',
      tags: [
        'Non-Profit',
        'Web Design',
        'Environmental Sustainability',
        'Social Impact',
        'Waste Management',
        'Youth Empowerment',
      ],
      results: [
        'Impactful Mission Showcase',
        'Program Awareness Platform',
        'Community Engagement Hub',
      ],
      client: {
        name: 'BTO Global Foundation',
        industry: 'Non-Profit / Environmental Sustainability',
        location: 'Global',
        size: 'Foundation',
      },
      challenge:
        'BTO Global Foundation needed a compelling digital platform to showcase their innovative Waste-to-Wealth model and communicate their mission of empowering youth and women through environmental sustainability. They required a website that could effectively present their programs in recycling, composting, and creative waste reuse, while inspiring community participation and attracting potential partners and donors.',
      solution:
        'We designed an engaging, mission-driven website that brings their Waste-to-Wealth programs to life. The platform features clear program descriptions, impact stories, and visual storytelling that demonstrates how they help youth and women turn waste into income. The design emphasizes their social and environmental impact, with intuitive navigation that guides visitors through their various initiatives and opportunities for involvement.',
      strategy: [
        'Created an inspiring design that highlights environmental and social impact',
        'Developed clear program showcases for recycling, composting, and creative reuse initiatives',
        'Implemented storytelling elements to demonstrate real-world impact',
        'Designed sections for youth and women empowerment success stories',
        'Integrated calls-to-action for community participation and support',
        'Optimized for accessibility to reach diverse audiences',
        'Created content structure for ongoing program updates and impact reporting',
      ],
      services: [
        'Web Design',
        'Web Development',
        'UI/UX Design',
        'Responsive Design',
        'Content Strategy',
        'Mission-Driven Design',
      ],
      duration: '7 weeks',
      year: '2025',
      projectUrl: 'https://btoglobalfoundation.com',
      featured: true,
      order: 4,
    };

    const result = await client.create(project);
    console.log('✅ Project created successfully!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 Project URL:', project.projectUrl);
    console.log('♻️  Focus: Waste-to-Wealth for Youth & Women Empowerment');
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Find the "BTO Global Foundation" project');
    console.log('3. Add the main project image');
    console.log('4. (Optional) Add gallery images');
    console.log('5. Publish the project');
    console.log('\n💡 Note: No testimonial created for this project');
  } catch (error) {
    console.error('❌ Error creating project:', error);
    process.exit(1);
  }
}

addBTOGlobalProject();
