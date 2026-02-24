import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const pathMap: Record<string, string> = {
  'blog': '/blog',
  'project': '/projects', 
  'service': '/services',
  'testimonial': '/testimonials',
  'category': '/blog',
  'faq': '/contact',
  'teamMember': '/about',
  'companyLogo': '/',
  'siteSettings': '/',
};

export async function POST(request: NextRequest) {
  try {
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

    const { _type, slug } = body;
    
    console.log(`🔄 Revalidating: ${_type}${slug?.current ? ` - ${slug.current}` : ''}`);
    
    const basePath = pathMap[_type];
    if (basePath) {
      if (slug?.current) {
        await revalidatePath(`${basePath}/${slug.current}`);
        console.log(`✅ Revalidated: ${basePath}/${slug.current}`);
      }
      await revalidatePath(basePath);
      console.log(`✅ Revalidated: ${basePath}`);
    }
    
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

export async function GET() {
  return NextResponse.json({ 
    message: 'Revalidation endpoint. Use POST with Sanity webhook.' 
  }, { status: 405 });
}
