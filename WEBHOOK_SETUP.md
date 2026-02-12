# Sanity On-Demand Revalidation Setup

This guide shows you how to set up instant content updates without full rebuilds.

## What This Does

When you publish, edit, delete, or unpublish ANY content in Sanity Studio:
- ✅ Changes appear **instantly** on your live site (no waiting)
- ✅ Only affected pages regenerate (not the entire site)
- ✅ Works for ALL content types (blog, projects, services, testimonials, etc.)
- ✅ Automatically works for future content types you add

## Setup Steps (5 minutes)

### Step 1: Generate a Webhook Secret

Open your terminal and run:

```bash
openssl rand -base64 32
```

Copy the output (it will look like: `dGhpc2lzYXNlY3JldGtleWZvcndlYmhvb2tz...`)

### Step 2: Add Secret to Vercel

1. Go to https://vercel.com/dashboard
2. Select your `realdiamond-digital` project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key:** `SANITY_REVALIDATE_SECRET`
   - **Value:** [paste the secret you generated in Step 1]
   - **Environment:** Check all three (Production, Preview, Development)
6. Click **Save**

### Step 3: Configure Sanity Webhook

1. Go to https://sanity.io/manage
2. Select your project
3. Go to **API** tab → **Webhooks** (in left sidebar)
4. Click **Create webhook**
5. Configure:
   - **Name:** `Vercel On-Demand Revalidation`
   - **URL:** `https://realdiamond-digital.vercel.app/api/revalidate?secret=[paste your secret here]`
   - **Dataset:** `production`
   - **Trigger on:** 
     - ☑️ Create
     - ☑️ Update
     - ☑️ Delete
   - **Filter:** Leave empty (applies to all documents)
   - **Projection:** 
     ```groq
     {
       _type,
       "slug": slug.current
     }
     ```
   - **HTTP method:** POST
   - **HTTP Headers:** Leave default
6. Click **Save**

### Step 4: Redeploy on Vercel

1. Go back to Vercel dashboard
2. Go to **Deployments** tab
3. Click **...** (three dots) on the latest deployment
4. Click **Redeploy**
5. Wait ~2 minutes for deployment to complete

## Testing

1. Go to your Sanity Studio: https://realdiamond-digital.vercel.app/myworks
2. Edit any blog post and click **Publish**
3. Immediately go to your live blog page
4. Refresh → Changes should appear within 5-10 seconds! 🎉

## How It Works

```
You publish in Sanity
       ↓
Sanity sends webhook to /api/revalidate
       ↓
Next.js regenerates only the affected pages
       ↓
Fresh content served instantly
       ↓
No full rebuild needed!
```

## Supported Content Types (Automatic)

The webhook automatically handles:
- **Blog posts** → `/blog`
- **Projects** → `/projects`
- **Services** → `/services`
- **Testimonials** → `/testimonials`
- **Categories** → `/blog`
- **FAQs** → `/contact`
- **Team members** → `/about`
- **Company logos** → Homepage

### Adding New Content Types

To add a new content type, just edit `app/api/revalidate/route.ts`:

```typescript
const pathMap: Record<string, string> = {
  'blog': '/blog',
  'project': '/projects',
  'yourNewType': '/your-path',  // Add this line
  // ... rest
};
```

## Troubleshooting

**Changes not appearing instantly?**
1. Wait 10-15 seconds and refresh again
2. Check Vercel deployment logs for errors
3. Verify `SANITY_REVALIDATE_SECRET` environment variable is set
4. Check Sanity webhook deliveries:
   - Go to Sanity.io → API → Webhooks
   - Click your webhook → **Deliveries** tab
   - Look for red error icons

**Webhook shows errors?**
- Make sure the secret in the URL matches the environment variable
- Ensure the URL is correct: `https://realdiamond-digital.vercel.app/api/revalidate?secret=YOUR_SECRET`
- Check that you redeployed after adding the environment variable

## Benefits

**Before (Time-based ISR):**
- Updates appear within 60 seconds
- Pages regenerate even when nothing changed

**After (On-Demand ISR):**
- Updates appear within 5-10 seconds
- Only changed pages regenerate
- More efficient and faster

## Need Help?

Check the Sanity webhook delivery logs for detailed error messages.
