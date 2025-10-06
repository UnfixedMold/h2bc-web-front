'use server'

import { setRegionCookie } from '@/lib/data/regions'

export async function setRegionAction(regionId: string) {
  await setRegionCookie(regionId)
}
