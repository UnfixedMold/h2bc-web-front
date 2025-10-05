'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setRegionCookie } from '@/actions/regions';
import { useTransition } from 'react';

interface Region {
  id: string;
  name: string;
  shortName?: string;
  currencyCode: string;
}

interface RegionSelectorProps {
  regions: Region[];
  currentRegionId: string;
  error: string | null;
}

export default function RegionSelector({ regions, currentRegionId, error }: RegionSelectorProps) {
  const [isPending, startTransition] = useTransition();
  const currentRegion = regions.find(r => r.id === currentRegionId);
  const displayLabel = currentRegion?.shortName || process.env.NEXT_PUBLIC_DEFAULT_REGION_SHORT_NAME || "";
  const disabled = !!error || regions.length <= 1 || isPending;

  const handleRegionChange = (regionId: string) => {
    startTransition(async () => {
      await setRegionCookie(regionId);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" disabled={disabled} className="gap-1">
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
  );
}
