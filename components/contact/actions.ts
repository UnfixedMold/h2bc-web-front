'use server'

import { submitContactMessage } from '@/lib/data/contact'
import type { ContactFormData } from './types'

export async function submitContactAction(data: ContactFormData) {
  return await submitContactMessage(data)
}
