
"use client"

import React, { createContext, useContext, useState, useTransition } from "react"
import { setRegionCookie } from "@/app/actions/regions"

export type Region = {
  id: string
  name: string
  shortName?: string
}

interface RegionContextType {
  regions: Region[]
  selectedRegionId: string
  setSelectedRegionId: (id: string) => void
  error: boolean
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

  return (
    <RegionContext.Provider
      value={{ regions, selectedRegionId, setSelectedRegionId, error }}
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
