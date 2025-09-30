'use server'

import { unstable_cache } from "next/cache"
import { cookies } from 'next/headers'
import { REGION_COOKIE_OPTIONS } from '@/lib/constants'
import { sdk } from "@/lib/medusa"

export async function setRegionCookie(regionId: string) {
  const cookieStore = await cookies()
  cookieStore.set('region_id', regionId, REGION_COOKIE_OPTIONS)
}

export async function getRegionCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('region_id')?.value
}

const fetchRegionsFromAPI = unstable_cache(
  async () => {
    const { regions } = await sdk.store.region.list()
    return regions.map(r => ({
      id: r.id,
      name: r.name,
      shortName: r.metadata?.shortName as string | undefined
    }))
  },
  ['regions'],
  { revalidate: 3600, tags: ['regions'] }
)

export async function getRegions() {
  try {
    const regions = await fetchRegionsFromAPI()
    return {
      regions,
      error: false
    }
  } catch (error) {
    console.error("Failed to fetch regions:", error)
    return {
      regions: [],
      error: true
    }
  }
}