'use client'

import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTransition } from 'react'

interface Region {
  id: string
  name: string
  shortName?: string
  currencyCode: string
}

interface RegionSelectorProps {
  regions: Region[]
  currentRegion?: Region | null
  disabled: boolean
  onRegionChange: (regionId: string) => Promise<void>
}

export default function RegionSelector({
  regions,
  currentRegion,
  disabled,
  onRegionChange,
}: RegionSelectorProps) {
  const [isPending, startTransition] = useTransition()

  const displayLabel = currentRegion?.shortName || '???'

  const handleRegionChange = (regionId: string) => {
    startTransition(async () => {
      await onRegionChange(regionId)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          disabled={disabled || isPending}
          className="gap-1"
        >
          {displayLabel}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {regions.map((region) => (
          <DropdownMenuItem
            key={region.id}
            onClick={() => handleRegionChange(region.id)}
          >
            {region.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
