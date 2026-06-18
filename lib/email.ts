import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM || 'VeggieStack <onboarding@resend.dev>'
const ADMIN = process.env.ADMIN_EMAIL || 'wilfordmtikwiri@gmail.com'

interface SendEmailOptions {
  subject: string
  html: string
  replyTo?: string
}

export async function notifyAdmin({ subject, html, replyTo }: SendEmailOptions) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    replyTo,
    subject: `[VeggieStack] ${subject}`,
    html,
  })
}
