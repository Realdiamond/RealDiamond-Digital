/**
 * Script to manually trigger cache revalidation for Next.js pages
 * Run this after making changes in Sanity to see them immediately
 * 
 * Usage: npm run clear-cache
 */

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const paths = [
  '/services',
  '/projects',
  '/blog',
  '/testimonials',
  '/contact',
  '/about',
  '/',
];

async function clearCache() {
  if (!REVALIDATE_SECRET) {
    console.error('❌ SANITY_REVALIDATE_SECRET not found in environment variables');
    console.log('💡 Add it to your .env.local file');
    process.exit(1);
  }

  console.log('🔄 Starting cache revalidation...\n');

  for (const path of paths) {
    try {
      const url = `${BASE_URL}/api/revalidate?secret=${REVALIDATE_SECRET}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          _type: path === '/' ? 'siteSettings' : path.replace('/', ''),
          revalidate: true 
        }),
      });

      if (response.ok) {
        console.log(`✅ Revalidated: ${path}`);
      } else {
        console.log(`⚠️  Failed to revalidate: ${path} (${response.status})`);
      }
    } catch (error) {
      console.log(`❌ Error revalidating ${path}:`, error);
    }
  }

  console.log('\n✨ Cache revalidation complete!');
  console.log('🔄 Refresh your browser to see the changes');
}

clearCache();
