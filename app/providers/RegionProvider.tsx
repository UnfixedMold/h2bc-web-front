
"use client"

import React, { createContext, useContext, useState, useTransition } from "react"
import { setRegionCookie } from "@/app/actions/regions"

export type Region = {
  id: string
  name: string
  shortName?: string
  currencyCode: string
}

interface RegionContextType {
  regions: Region[]
  selectedRegionId: string
  setSelectedRegionId: (id: string) => void
  error: boolean
  currencyCode: string
}

const RegionContext = createContext<RegionContextType | null>(null)

export const RegionProvider = ({
  children,
  regions,
  initialRegionId,
  error = false
}: {
  children: React.ReactNode
  regions: Region[]
  initialRegionId: string
  error?: boolean
}) => {
  const [selectedRegionId, _setSelectedRegionId] = useState<string>(initialRegionId)
  const [, startTransition] = useTransition()

  const setSelectedRegionId = (id: string) => {
    _setSelectedRegionId(id)
    startTransition(async () => {
      await setRegionCookie(id)
    })
  }

  const selectedRegion = regions.find(r => r.id === selectedRegionId)
  const currencyCode = selectedRegion?.currencyCode ?? process.env.NEXT_PUBLIC_DEFAULT_REGION_CURRENCY_CODE ?? 'USD'

  return (
    <RegionContext.Provider
      value={{ regions, selectedRegionId, setSelectedRegionId, error, currencyCode }}
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
