# Error Monitoring Setup Guide - Sentry

This project uses [Sentry](https://sentry.io) for error monitoring and performance tracking in production.

## Features

- **Error Tracking**: Automatically captures and reports errors
- **Performance Monitoring**: Tracks application performance metrics
- **Session Replay**: Records user sessions when errors occur
- **Source Maps**: Shows exact code locations in error stack traces
- **Production-Only**: Only active in production environment

## Setup Instructions

### 1. Create a Sentry Account

1. Go to [sentry.io](https://sentry.io) and sign up for a free account
2. Create a new project and select "Next.js" as the platform
3. Note your DSN (Data Source Name) - you'll need this

### 2. Configure Environment Variables

Add the following to your `.env.local` file (or Vercel environment variables):

```env
# Error Monitoring - Sentry
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
SENTRY_AUTH_TOKEN=your-auth-token
```

**Where to find these values:**

- **NEXT_PUBLIC_SENTRY_DSN**: Settings > Projects > [Your Project] > Client Keys (DSN)
- **SENTRY_ORG**: Your organization slug from the URL (e.g., `https://sentry.io/organizations/your-org-slug/`)
- **SENTRY_PROJECT**: Your project slug from Settings > Projects
- **SENTRY_AUTH_TOKEN**: Settings > Developer Settings > Auth Tokens (create a new token with `project:releases` scope)

### 3. Deploy to Production

Sentry is configured to only run in production environments. Deploy your app to Vercel or your hosting platform.

```bash
npm run build
npm start
```

Or deploy to Vercel:

```bash
vercel --prod
```

## Testing Error Monitoring

To verify Sentry is working correctly:

### Local Testing (Development Mode)

While Sentry is disabled in development by default, you can test it by temporarily setting:

```typescript
// In sentry.client.config.ts and sentry.server.config.ts
enabled: true, // Change from process.env.NODE_ENV === 'production'
```

### Production Testing

Once deployed, you can test error reporting:

1. **Trigger a test error**: Add a temporary button to any page:

```tsx
<button onClick={() => { throw new Error("Test Error"); }}>
  Test Sentry
</button>
```

2. **Check Sentry Dashboard**: Go to [sentry.io](https://sentry.io) > Issues
   - You should see the error appear within seconds
   - Click on it to see the full stack trace

## Configuration Files

The following files configure Sentry:

- **sentry.client.config.ts**: Client-side error tracking
- **sentry.server.config.ts**: Server-side error tracking
- **instrumentation.ts**: Next.js instrumentation hook
- **next.config.mjs**: Sentry webpack plugin configuration
- **app/error.tsx**: Page-level error boundary
- **app/global-error.tsx**: Global error boundary

## Error Boundaries

Two error boundaries are configured:

### Page-Level Error Boundary (`app/error.tsx`)

Catches errors in specific pages and their components. Shows a user-friendly error page with:
- Error message (in development)
- "Try again" button to reset the error boundary
- "Go home" button to navigate back

### Global Error Boundary (`app/global-error.tsx`)

Catches errors in the root layout. This is the last line of defense for uncaught errors.

## Performance Monitoring

Sentry is configured to sample:
- **100%** of transactions for performance monitoring
- **10%** of all user sessions for replay
- **100%** of sessions with errors for replay

You can adjust these in the Sentry config files:

```typescript
tracesSampleRate: 1.0, // 0.0 to 1.0
replaysSessionSampleRate: 0.1, // 10% of sessions
replaysOnErrorSampleRate: 1.0, // 100% of error sessions
```

## Source Maps

Source maps are automatically uploaded to Sentry during build:

- Hidden from client bundles for security
- Uploaded to Sentry for stack trace de-obfuscation
- Shows exact TypeScript code locations in errors

## Best Practices

1. **Custom Error Messages**: Add context to errors:

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // risky operation
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'checkout' },
    extra: { userId: user.id }
  });
}
```

2. **User Feedback**: Collect user feedback on errors:

```typescript
Sentry.showReportDialog({
  eventId: lastEventId,
});
```

3. **Performance Tracking**: Track custom transactions:

```typescript
const transaction = Sentry.startTransaction({
  name: 'API: Fetch Products',
});
// ... your code
transaction.finish();
```

## Monitoring in Production

Access your Sentry dashboard to:

1. **View Errors**: See all errors with stack traces
2. **Track Performance**: Monitor page load times and API calls
3. **Watch Replays**: See exactly what users did before an error
4. **Set Alerts**: Get notified of critical errors via email/Slack
5. **Release Tracking**: Track errors by deployment version

## Cost Optimization

Sentry's free tier includes:

- 5,000 errors/month
- 10,000 performance units/month
- 50 replays/month

To stay within limits:

- Adjust sample rates in production
- Filter out known issues
- Set up quotas in Sentry dashboard

## Troubleshooting

### Errors not appearing in Sentry?

1. Check environment variables are set
2. Verify `enabled: true` in prod or temporarily in dev
3. Check browser console for Sentry initialization
4. Ensure DSN is correct

### Source maps not working?

1. Check `SENTRY_AUTH_TOKEN` has correct permissions
2. Verify org/project slugs match your Sentry account
3. Check build logs for source map upload status

### Too many errors?

1. Add error filtering in Sentry config:

```typescript
beforeSend(event, hint) {
  // Don't send certain errors
  if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
    return null;
  }
  return event;
},
```

## Support

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Discord](https://discord.gg/sentry)
- [GitHub Issues](https://github.com/getsentry/sentry-javascript/issues)
