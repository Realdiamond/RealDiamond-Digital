import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    console.log('Contact form submission received:', { name, email, company, service });

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (process.env.BREVO_API_KEY) {
      console.log('Attempting to send email via Brevo...');
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: 'RealDiamond Digital',
            email: 'contact@realdiamonddigital.studio',
          },
          to: [
            {
              email: process.env.CONTACT_EMAIL || 'realdiamonddigital@gmail.com',
              name: 'RealDiamond Digital Team',
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
                    <span class="value">${name}</span>
                  </div>

                  <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${email}" style="color: #667eea;">${email}</a></span>
                  </div>

                  <div class="info-row">
                    <span class="label">Company:</span>
                    <span class="value">${company || 'Not provided'}</span>
                  </div>

                  <div class="info-row">
                    <span class="label">Service Interest:</span>
                    <span class="value">${service || 'Not specified'}</span>
                  </div>

                  <div class="info-row">
                    <span class="label">Message:</span>
                    <div class="value" style="margin-top: 8px; white-space: pre-wrap;">${message}</div>
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Brevo API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return NextResponse.json(
          { error: `Email service error: ${errorData.message || 'Unknown error'}` },
          { status: 500 }
        );
      }

      console.log('Email sent successfully via Brevo');
    } else {
      console.log('BREVO_API_KEY not found - Contact Form Submission:', {
        name,
        email,
        company,
        service,
        message,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
