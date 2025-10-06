import 'server-only'

import { unstable_cache } from 'next/cache'
import { cookies } from 'next/headers'
import { sdk } from '@/lib/medusa'

const REGION_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
  httpOnly: true,
}

export async function setRegionCookie(regionId: string) {
  const cookieStore = await cookies()
  cookieStore.set('region_id', regionId, REGION_COOKIE_OPTIONS)
}

export async function getRegionCookie(): Promise<string> {
  const cookieStore = await cookies()
  const regionId = cookieStore.get('region_id')?.value

  if (!regionId) {
    const defaultRegionId = process.env.NEXT_PUBLIC_DEFAULT_REGION_ID!
    cookieStore.set('region_id', defaultRegionId, REGION_COOKIE_OPTIONS)
    return defaultRegionId
  }

  return regionId
}

const CACHE_REVALIDATE_TIME = 3600

const fetchRegionsFromAPI = unstable_cache(
  async () => {
    const { regions } = await sdk.store.region.list()
    return regions.map((r) => ({
      id: r.id,
      name: r.name,
      shortName: r.metadata?.shortName as string | undefined,
      currencyCode: r.currency_code,
    }))
  },
  ['regions'],
  { revalidate: CACHE_REVALIDATE_TIME, tags: ['regions'] }
)

export async function getRegions() {
  try {
    const regions = await fetchRegionsFromAPI()
    return {
      regions,
      error: null,
    }
  } catch (error) {
    console.error('Failed to fetch regions:', error)
    return {
      regions: [],
      error:
        'Failed to load regions. Using default region. Please refresh the page to try again.',
    }
  }
}
