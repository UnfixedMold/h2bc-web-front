import PageLayout from '../components/ui/PageLayout'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with h2bc',
}

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email)
}

export default function ContactPage() {
  async function submitAction(_prev: any, formData: FormData) {
    'use server'

    const email = String(formData.get('email') || '').trim()
    const topic = String(formData.get('topic') || '').trim()
    const message = String(formData.get('message') || '').trim()
    const files = formData.getAll('attachments') as unknown as File[]

    const fieldErrors: Record<string, string> = {}
    if (!isValidEmail(email)) fieldErrors.email = 'Enter a valid email.'
    if (!topic) fieldErrors.topic = 'Select a topic.'
    if (!message || message.length < 5) fieldErrors.message = 'Message is too short.'
    if (files && files.length > 5) fieldErrors.attachments = 'Max 5 files.'

    // Approximate total size limit: 10 MB
    const totalSize = (files || []).reduce((n, f) => n + (f?.size || 0), 0)
    if (totalSize > 10 * 1024 * 1024) fieldErrors.attachments = 'Total attachments size must be under 10 MB.'

    if (Object.keys(fieldErrors).length) {
      return { ok: false, fieldErrors, message: 'Please fix the errors and try again.' }
    }

    // TODO: integrate with an email service or ticketing system.
    // For now, pretend we handled it.
    return { ok: true }
  }

  return (
    <PageLayout heading="Contact">
      <ContactForm action={submitAction} />
    </PageLayout>
  )
}
