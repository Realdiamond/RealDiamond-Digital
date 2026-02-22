import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function listProjects() {
  try {
    const projects = await client.fetch(
      `*[_type == "project"]{_id, title, "slug": slug.current}`
    );
    
    console.log('\n📋 All Projects in Database:\n');
    projects.forEach((project: any) => {
      console.log(`- ${project.title}`);
      console.log(`  ID: ${project._id}`);
      console.log(`  Slug: ${project.slug}`);
      console.log('');
    });
    
    console.log(`Total: ${projects.length} projects\n`);
  } catch (error) {
    console.error('Error:', error);
  }
}

listProjects();
