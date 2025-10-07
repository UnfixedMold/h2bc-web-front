'use server'

import { sdk } from '@/lib/medusa'
import { cached } from '@/lib/cache'

const CACHE_REVALIDATE_TIME = 3600

const fetchRegionsFromAPI = cached(
  async () => {
    const { regions } = await sdk.store.region.list()
    return regions.map((r) => ({
      id: r.id,
      name: r.name,
      shortName: r.metadata?.shortName || '???',
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
