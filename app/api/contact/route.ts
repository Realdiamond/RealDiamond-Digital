import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, we'll use a simple email service approach
    // You can replace this with Resend, SendGrid, or any email service
    
    // Option 1: Using Resend (recommended)
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@realdiamonddigital.com',
          to: process.env.CONTACT_EMAIL || 'akinsanmioluwatimilehin@gmail.com',
          subject: `New Contact Form Submission from ${name}`,
          html: `
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
        throw new Error('Failed to send email');
      }
    } else {
      // Fallback: Log to console for development
      console.log('Contact Form Submission:', {
        name,
        email,
        company,
        service,
        message,
        timestamp: new Date().toISOString(),
      });
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
