# Testimonials Management Guide

## Overview
Your testimonials system is now fully integrated with Sanity CMS, supporting both text and video testimonials with a beautiful carousel display.

## Adding Testimonials in Sanity Studio

### Access Sanity Studio
1. Visit: `https://realdiamond-digital.vercel.app/myworks` (or `http://localhost:3000/myworks` locally)
2. Navigate to **Content** → **Testimonials**

---

## Text Testimonials

### Fields:
- **Type**: Select "Text Testimonial"
- **Name**: Client's full name (Required)
- **Company**: Client's company name (Optional)
- **Position**: Client's job title (Optional)
- **Content**: The testimonial text/quote (Required)
- **Rating**: Star rating 1-5 (Optional)
- **Image**: Client profile picture (Optional)
- **Order**: Number for sorting (lower = appears first)
- **Featured**: Toggle to feature on homepage
- **Show on Homepage**: Toggle to show in homepage carousel

### Example:
```
Name: Sarah Mitchell
Company: Cool HVAC Services
Position: Owner
Content: "RealDiamond Digital tripled our leads in 3 months!"
Rating: 5
Order: 1
Featured: Yes
Show on Homepage: Yes
```

---

## Video Testimonials

### Fields:
- **Type**: Select "Video Testimonial"
- **Name**: Client's full name (Required)
- **Company**: Client's company name (Optional)
- **Position**: Client's job title (Optional)

### Video Source Options:

#### Option 1: YouTube Link
1. **Video Source**: Select "YouTube Link"
2. **Video URL**: Paste full YouTube URL (Required)
   - Accepted formats:
     - `https://www.youtube.com/watch?v=VIDEO_ID`
     - `https://youtu.be/VIDEO_ID`
     - `https://www.youtube.com/embed/VIDEO_ID`

#### Option 2: Upload Video File
1. **Video Source**: Select "Upload Video File"
2. **Video File**: Click to upload your video (Required)
   - Accepted formats: .mp4, .mov, .avi, .webm
   - Recommended: .mp4 for best compatibility

### Common Fields (Both Options):
- **Video Thumbnail**: Upload custom thumbnail image (Required)
  - Recommended size: 1920x1080px (16:9 aspect ratio)
  - Formats: .jpg, .png, .webp
- **Video Duration**: Display text (e.g., "2:45", "1:30")
- **Video Title**: Short description of the video
- **Order**: Number for sorting
- **Featured**: Toggle to feature
- **Show on Homepage**: Toggle for homepage carousel

### Example YouTube Video:
```
Type: Video Testimonial
Name: John Smith
Company: Premier Plumbing Co.
Position: CEO
Video Source: YouTube Link
Video URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Video Thumbnail: [Upload image]
Video Duration: 2:15
Video Title: How We Increased Bookings by 250%
Order: 1
Show on Homepage: Yes
```

### Example Uploaded Video:
```
Type: Video Testimonial
Name: Lisa Johnson
Company: Spotless Cleaning Services
Position: Owner
Video Source: Upload Video File
Video File: [Upload testimonial.mp4]
Video Thumbnail: [Upload image]
Video Duration: 1:45
Video Title: Our Success Story with RealDiamond
Order: 2
Show on Homepage: Yes
```

---

## Display Locations

### Testimonials Page (`/testimonials`)
- **Video Section**: Carousel with all video testimonials (ordered by `order` field)
- **Text Section**: 3-column grid with all text testimonials (ordered by `order` field)

### Homepage
- Only testimonials with `Show on Homepage: Yes` appear in homepage carousel
- Typically limit to 3-4 best testimonials for homepage

---

## Tips for Best Results

### For Text Testimonials:
- Keep content concise (2-4 sentences ideal)
- Use actual quotes from clients
- Include specific results when possible (e.g., "increased leads by 150%")
- Add profile pictures for authenticity
- Use 5-star ratings prominently

### For Video Testimonials:
- **YouTube Option**: Best for professionally produced videos already on YouTube
- **Upload Option**: Best for raw testimonial videos you recorded yourself
- Keep videos short (1-3 minutes ideal)
- Create engaging thumbnails (use client's face, clear text overlay)
- Include duration so visitors know time commitment
- Test videos before publishing

### Video Recording Tips:
- Good lighting and clear audio are essential
- Film horizontally (16:9 format)
- Ask clients to mention specific results
- Keep introduction brief, focus on results and experience
- Export as .mp4 with H.264 codec for best compatibility

### Thumbnail Best Practices:
- Use high-resolution images (1920x1080px minimum)
- Include client's face (builds trust)
- Add subtle text overlay with key benefit
- Match your brand colors
- Ensure text is readable on mobile

---

## How the Carousel Works

### Features:
- **Auto-responsive**: Shows 1 video on mobile, 2 on tablet, 3 on desktop
- **Play Button**: Click thumbnail to play video inline
- **YouTube**: Embeds and autoplays
- **Uploaded Videos**: Plays with native HTML5 player
- **Navigation**: Arrow buttons (desktop) and swipe gestures (mobile)
- **Dots Indicator**: Shows current position in carousel

### Ordering:
Testimonials display in the order set by the `order` field:
- Order 1 = First
- Order 2 = Second
- And so on...

---

## Common Issues & Solutions

### Video Won't Play
- **YouTube**: Check URL is valid and video is public (not private/unlisted if you want public access)
- **Uploaded**: Ensure file is .mp4 format and under Sanity's file size limit

### Thumbnail Not Showing
- Check image was uploaded successfully
- Try re-uploading in .jpg format
- Verify image size is reasonable (under 5MB)

### Testimonial Not Appearing
- Check `Type` field is set correctly (Text or Video)
- Verify testimonial is published (not draft)
- Check `order` field has a number value
- For homepage: Verify `Show on Homepage` is toggled on

### Wrong Order
- Edit testimonials and adjust `order` field
- Lower numbers appear first
- All testimonials need order values for proper sorting

---

## Maintenance

### Regular Updates:
- Add new testimonials as you complete projects
- Keep 6-12 text testimonials active
- Maintain 3-6 video testimonials
- Archive outdated testimonials (don't delete - change to draft)
- Update homepage selection quarterly

### Quality Control:
- Review all testimonials monthly
- Ensure videos still work (especially YouTube links)
- Update thumbnails if needed
- Check for typos in text testimonials
- Verify client information is current

---

## Technical Details

### Files Changed:
- `app/testimonials/page.tsx` - Now pulls from Sanity, no hardcoded data
- `src/components/VideoTestimonialCarousel.tsx` - New carousel component
- `sanity/schemas/testimonial.ts` - Enhanced with video upload options

### Sanity Queries:
- Text testimonials: Filtered by `type == "text"`, ordered by `order`
- Video testimonials: Filtered by `type == "video"`, ordered by `order`

### No Code Required:
- All changes happen in Sanity Studio UI
- Changes appear on website immediately after publishing
- No need to redeploy or touch code

---

## Next Steps

1. **Log in to Sanity Studio**
2. **Delete or unpublish the placeholder testimonials** (if any exist)
3. **Add your first real client testimonial** (start with text, easier)
4. **Preview on testimonials page** to see it live
5. **Add video testimonial** when you have one ready
6. **Enable best testimonials** for homepage display

Need help? The testimonial schema is self-documenting in Sanity Studio - each field has helpful descriptions!
