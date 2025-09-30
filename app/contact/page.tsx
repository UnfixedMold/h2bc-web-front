import Heading from '../components/Heading'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with h2bc',
}

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email)
}

interface FormState {
  ok: boolean
  fieldErrors?: Record<string, string>
  message?: string
}

export default function ContactPage() {
  async function submitAction(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
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
    <div className="flex justify-center pt-15">
      <div className="max-w-4xl flex flex-col flex-1">
        <div className='pb-10'>
          <Heading level={1} font="blackletter" className="text-4xl lg:text-5xl">
            Contact
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question or need assistance? Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
        <ContactForm action={submitAction} />
      </div>
    </div>
  )
}
