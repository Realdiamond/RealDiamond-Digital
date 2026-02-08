import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Map Sanity document types to their URL paths
const pathMap: Record<string, string> = {
  'blog': '/blog',
  'project': '/projects', 
  'service': '/services',
  'testimonial': '/testimonials',
  'category': '/blog',
  'faq': '/contact',
  'teamMember': '/about',
  'companyLogo': '/',
};

export async function POST(request: NextRequest) {
  try {
    // Verify secret token for security
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ 
        message: 'Invalid token' 
      }, { status: 401 });
    }

    const body = await request.json();
    
    if (!body) {
      return NextResponse.json({ 
        message: 'No body provided' 
      }, { status: 400 });
    }

    // Extract document type and slug from Sanity webhook
    const { _type, slug } = body;
    
    console.log(`🔄 Revalidating: ${_type}${slug?.current ? ` - ${slug.current}` : ''}`);
    
    // Revalidate specific document page if it has a slug
    const basePath = pathMap[_type];
    if (basePath) {
      if (slug?.current) {
        await revalidatePath(`${basePath}/${slug.current}`);
        console.log(`✅ Revalidated: ${basePath}/${slug.current}`);
      }
      // Always revalidate the listing page
      await revalidatePath(basePath);
      console.log(`✅ Revalidated: ${basePath}`);
    }
    
    // Always revalidate homepage (shows featured content from multiple types)
    await revalidatePath('/');
    console.log('✅ Revalidated: /');
    
    return NextResponse.json({ 
      revalidated: true, 
      type: _type,
      slug: slug?.current,
      timestamp: new Date().toISOString()
    });
    
  } catch (err: any) {
    console.error('❌ Revalidation error:', err);
    return NextResponse.json({ 
      revalidated: false, 
      error: err?.message || 'Error revalidating' 
    }, { status: 500 });
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ 
    message: 'Revalidation endpoint. Use POST with Sanity webhook.' 
  }, { status: 405 });
}
