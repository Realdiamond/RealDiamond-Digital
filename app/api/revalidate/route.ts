import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { CMS_TAGS, docTag, entryTag, listTag, type CmsDocType } from '@/lib/cms-cache';

const pathMap: Record<CmsDocType, string> = {
  blog: '/blog',
  project: '/projects',
  service: '/services',
  testimonial: '/testimonials',
  category: '/blog',
  faq: '/contact',
  teamMember: '/about',
  companyLogo: '/',
  siteSettings: '/',
};

const detailRouteMap: Partial<Record<CmsDocType, string>> = {
  blog: '/blog',
  project: '/projects',
};

function isCmsDocType(value: string): value is CmsDocType {
  return value in CMS_TAGS;
}

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
    const slugValue = typeof slug?.current === 'string' ? slug.current : undefined;

    if (!isCmsDocType(_type)) {
      return NextResponse.json({
        message: 'Unsupported document type',
      }, { status: 400 });
    }
    
    console.log(`Revalidating CMS content: ${_type}${slugValue ? `/${slugValue}` : ''}`);

    revalidateTag(docTag(_type));
    revalidateTag(listTag(_type));
    if (slugValue) {
      revalidateTag(entryTag(_type, slugValue));
    }

    const basePath = pathMap[_type];
    if (basePath) {
      if (slugValue && detailRouteMap[_type]) {
        await revalidatePath(`${detailRouteMap[_type]}/${slugValue}`);
        console.log(`Revalidated path: ${detailRouteMap[_type]}/${slugValue}`);
      }
      await revalidatePath(basePath);
      console.log(`Revalidated path: ${basePath}`);
    }

    await revalidatePath('/');
    console.log('Revalidated path: /');

    return NextResponse.json({ 
      revalidated: true, 
      type: _type,
      slug: slugValue,
      timestamp: new Date().toISOString()
    });

  } catch (err: any) {
    console.error('Revalidation error:', err);
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
