// Adds the "UI/UX Design" service to Sanity and places it second, right after
// Web Design & Development. Safe to re-run: an existing UI/UX document is kept
// as-is (so edits made in the Studio are not overwritten), and the display
// order is simply re-applied.
//
// Usage (needs a Sanity token with write access in .env.local or .env):
//   node scripts/add-uiux-service.mjs

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ quiet: true });

const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET || !SANITY_API_TOKEN) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET or SANITY_API_TOKEN.');
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const UIUX_ID = 'ui-ux-design';

const uiuxService = {
  _id: UIUX_ID,
  _type: 'service',
  id: { _type: 'slug', current: 'ui-ux-design' },
  title: 'UI/UX Design',
  tagline: 'Intuitive experiences that turn visitors into customers',
  icon: 'PenTool',
  problem:
    'Confusing navigation, cluttered layouts, and unclear next steps drive visitors away. When people have to work to find what they need, they leave for a competitor instead of calling you.',
  solution:
    'We research how your customers think, then map, wireframe, and prototype every step of their journey into clean, intuitive interfaces that guide them naturally to book, call, or buy.',
  benefits: [
    'User journeys designed to turn visitors into leads',
    'Clickable prototypes you can test before development',
    'Mobile-first layouts that feel effortless on every screen',
    'Consistent design systems for a polished, on-brand look',
    'Accessible interfaces that work for every visitor',
  ],
  bestFor:
    'Businesses launching a new website or app, or redesigning one that gets traffic but not enough enquiries.',
  subServices: [
    { _key: 'user-research', name: 'User Research', icon: 'Users' },
    { _key: 'wireframes-prototypes', name: 'Wireframes & Prototypes', icon: 'MousePointerClick' },
    { _key: 'ui-design', name: 'UI Design', icon: 'PenTool' },
    { _key: 'design-systems', name: 'Design Systems', icon: 'Layers' },
  ],
  gradient: 'from-indigo-400 to-violet-400',
  featured: true,
};

const existing = await client.fetch(
  `*[_type == "service" && !(_id in path("drafts.**")) && _id != $id] | order(coalesce(order, 999) asc) { _id, title }`,
  { id: UIUX_ID }
);

// Keep UI/UX right after Web Design & Development (or first if that service is missing).
const webIndex = existing.findIndex((s) => /web design/i.test(s.title || ''));
const ordered = [...existing];
ordered.splice(webIndex + 1, 0, { _id: UIUX_ID, title: uiuxService.title });

const tx = client.transaction().createIfNotExists(uiuxService);
ordered.forEach((s, index) => tx.patch(s._id, { set: { order: index + 1 } }));
await tx.commit();

console.log('Services order is now:');
ordered.forEach((s, index) => console.log(`  ${index + 1}. ${s.title}`));
