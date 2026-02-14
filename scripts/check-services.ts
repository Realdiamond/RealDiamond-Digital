import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function checkServices() {
  const services = await client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      icon,
      id
    }
  `);
  
  console.log('📋 Services in Sanity:\n');
  services.forEach((service: any) => {
    console.log(`Title: ${service.title}`);
    console.log(`Icon: "${service.icon}"`);
    console.log(`ID: ${service.id?.current}`);
    console.log('---\n');
  });
}

checkServices();
