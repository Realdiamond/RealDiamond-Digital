import { NextResponse } from "next/server";
import { contactSchema, escapeHtml } from "@/lib/contact";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_HUMAN_SUBMIT_MS = 2500;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientKey(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  return `${ip}:${userAgent.slice(0, 80)}`;
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();

  for (const [entryKey, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(entryKey);
    }
  }

  const current = rateLimitStore.get(key);

  if (!current) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return { allowed: false, retryAfter };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check your input and try again.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, service, message, website, formStartedAt } = parsed.data;

    if (website) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been sent successfully!",
        },
        { status: 200 }
      );
    }

    if (formStartedAt && Date.now() - formStartedAt < MIN_HUMAN_SUBMIT_MS) {
      return NextResponse.json(
        { error: "Submission was too fast. Please try again." },
        { status: 400 }
      );
    }

    const clientKey = getClientKey(req);
    const limit = checkRateLimit(clientKey);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait before trying again.",
          retryAfter: limit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(limit.retryAfter),
          },
        }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "Not provided");
    const safeService = escapeHtml(service || "Not specified");
    const safeMessage = escapeHtml(message);

    console.log("Contact form submission received", {
      requestId,
      name,
      email,
      service,
    });

    if (process.env.BREVO_API_KEY) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          sender: {
            name: "RealDiamond Digital",
            email: "contact@realdiamonddigital.studio",
          },
          to: [
            {
              email: process.env.CONTACT_EMAIL || "realdiamonddigital@gmail.com",
              name: "RealDiamond Digital Team",
            },
          ],
          replyTo: {
            email: email,
            name: name,
          },
          subject: `New Contact Form Submission from ${name}`,
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #667eea; color: white !important; padding: 14px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
                .info-row { margin: 15px 0; padding: 12px; background: white; border-radius: 6px; }
                .label { font-weight: bold; color: #667eea; display: block; margin-bottom: 5px; }
                .value { color: #333; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <p><strong>A new customer has contacted you through your website!</strong></p>
                  
                  <div style="text-align: center; margin: 25px 0;">
                    <a href="mailto:${email}?subject=Re: Your inquiry about ${service || 'our services'}" class="button">
                      📧 Reply to Customer (New Email)
                    </a>
                  </div>

                  <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">${safeName}</span>
                  </div>

                  <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${safeEmail}" style="color: #667eea;">${safeEmail}</a></span>
                  </div>

                  <div class="info-row">
                    <span class="label">Company:</span>
                    <span class="value">${safeCompany}</span>
                  </div>

                  <div class="info-row">
                    <span class="label">Service Interest:</span>
                    <span class="value">${safeService}</span>
                  </div>

                  <div class="info-row">
                    <span class="label">Message:</span>
                    <div class="value" style="margin-top: 8px; white-space: pre-wrap;">${safeMessage}</div>
                  </div>

                  <div class="footer">
                    <p>Sent from RealDiamond Digital contact form</p>
                    <p>Click the button above to start a fresh conversation with the customer</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        }),
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Brevo API error", {
          requestId,
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        return NextResponse.json(
          { error: "Message delivery failed. Please try again shortly." },
          { status: 500 }
        );
      }

      console.log("Email sent successfully via Brevo", { requestId });
    } else {
      console.error("BREVO_API_KEY not configured", {
        requestId,
        name,
        email,
        company,
        service,
        message,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    const isAbort = error instanceof DOMException && error.name === "AbortError";

    console.error("Contact form error", {
      requestId,
      error,
    });

    return NextResponse.json(
      {
        error: isAbort
          ? "Message service timed out. Please try again."
          : "Failed to send message. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
