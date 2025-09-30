'use server'

import { cookies } from 'next/headers'
import { REGION_COOKIE_OPTIONS } from '@/lib/constants'

export async function setRegionCookie(regionId: string) {
  const cookieStore = await cookies()
  cookieStore.set('region_id', regionId, REGION_COOKIE_OPTIONS)
}

export async function getRegionCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('region_id')?.value
}