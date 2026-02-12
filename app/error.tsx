"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full p-8 glass-card text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-muted-foreground">
            We've been notified and are working on a fix. Please try again.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline">Go home</Button>
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-left">
            <p className="text-xs text-muted-foreground font-mono mb-2">
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground font-mono">
                <strong>Error ID:</strong> {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
