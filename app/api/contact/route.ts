import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    console.log('Contact form submission received:', { name, email, company, service });

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Using Brevo (formerly Sendinblue) for email delivery
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
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Sent from RealDiamond Digital contact form</small></p>
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
      // Fallback: Log to console for development
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
