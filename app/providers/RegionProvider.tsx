
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { sdk } from "@/lib/medusa"

const DEFAULT_REGION_ID = process.env.NEXT_PUBLIC_DEFAULT_REGION_ID!
const DEFAULT_REGION_SHORT_NAME = process.env.NEXT_PUBLIC_DEFAULT_REGION_SHORT_NAME!

export const REGION_COOKIE_EXPIRES = 365;

export type Region = {
  id: string
  name: string
  shortName?: string
}

interface RegionContextType {
  regions: Region[]
  selectedRegionId: string
  setSelectedRegionId: (id: string) => void
  loading: boolean
  error: boolean
  defaultRegionShortName: string
}

const RegionContext = createContext<RegionContextType | null>(null)

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
  const cookieRegionId = Cookies.get("region_id")
  const [regions, setRegions] = useState<Region[]>([])
  const [selectedRegionId, _setSelectedRegionId] = useState<string>(cookieRegionId || DEFAULT_REGION_ID)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const setSelectedRegionId = (id: string) => {
    _setSelectedRegionId(id)
    Cookies.set("region_id", id, { expires: REGION_COOKIE_EXPIRES, path: "/" })
  }

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { regions } = await sdk.store.region.list()
        const mapped = regions.map(r => ({
          id: r.id,
          name: r.name,
          shortName: r.metadata?.shortName
        }))

        setRegions(mapped)

        if (!mapped.some(r => r.id === selectedRegionId)) {
          setSelectedRegionId(mapped[0]?.id || DEFAULT_REGION_ID)
        }

        setError(false)

      } catch (e) {

        console.error("Failed to fetch regions:", e)
        setRegions([])
        setSelectedRegionId(DEFAULT_REGION_ID)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchRegions()
  }, [selectedRegionId])

  return (
    <RegionContext.Provider
      value={{ regions, selectedRegionId, setSelectedRegionId, loading, error, defaultRegionShortName: DEFAULT_REGION_SHORT_NAME }}
    >
      {children}
    </RegionContext.Provider>
  )
}

export const useRegion = () => {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error("useRegion must be used within a RegionProvider")
  return ctx
}
