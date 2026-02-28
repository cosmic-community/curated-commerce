'use server'

import { Resend } from 'resend'

interface ContactFormState {
  success: boolean
  error: string | null
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string | null
  const email = formData.get('email') as string | null
  const message = formData.get('message') as string | null

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' }
  }

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { success: false, error: 'All fields are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return { success: false, error: 'Email service is not configured. Please try again later.' }
  }

  const resend = new Resend(resendApiKey)

  try {
    const { error } = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `Contact Form: Message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; width: 100px;">Name:</td>
              <td style="padding: 8px 12px; color: #1f2937;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151;">Email:</td>
              <td style="padding: 8px 12px; color: #1f2937;">
                <a href="mailto:${email}" style="color: #4f46e5;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
              Message
            </h3>
            <p style="margin: 0; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: 'Failed to send message. Please try again later.' }
    }

    return { success: true, error: null }
  } catch (err) {
    console.error('Contact form error:', err)
    return { success: false, error: 'An unexpected error occurred. Please try again later.' }
  }
}