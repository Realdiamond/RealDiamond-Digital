import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 1.0,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  debug: false,

  enabled: process.env.NODE_ENV === 'production',

  // Filter out third-party errors
  ignoreErrors: [
    // Tawk.to chat widget errors
    'Illegal invocation',
  ],

  beforeSend(event, hint) {
    // Filter out errors from Tawk.to and other third-party scripts
    const error = hint.originalException;
    
    if (event.exception) {
      const frames = event.exception.values?.[0]?.stacktrace?.frames || [];
      
      // Check if error originates from Tawk.to scripts
      const isTawkError = frames.some(frame => 
        frame.filename?.includes('tawk.to') ||
        frame.filename?.includes('twk-') ||
        frame.module?.includes('twk-')
      );
      
      if (isTawkError) {
        return null; // Don't send to Sentry
      }
    }
    
    return event;
  },
});
