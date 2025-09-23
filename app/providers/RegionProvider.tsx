"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { sdk } from "@/lib/medusa";

if (!process.env.NEXT_PUBLIC_DEFAULT_REGION_ID) {
    throw new Error("NEXT_PUBLIC_DEFAULT_REGION_ID env variable must be set");
}

if (!process.env.NEXT_PUBLIC_DEFAULT_REGION_SHORT_NAME) {
    throw new Error("NEXT_PUBLIC_DEFAULT_REGION_SHORT_NAME env variable must be set");
}

const DEFAULT_REGION_SHORT_NAME = process.env.NEXT_PUBLIC_DEFAULT_REGION_SHORT_NAME;
const DEFAULT_REGION_ID = process.env.NEXT_PUBLIC_DEFAULT_REGION_ID;

export type Region = {
    id: string;
    name: string;
    metadata?: { shortName?: string };
};

interface RegionContextType {
    regions: Region[];
    selectedRegionId: string;
    setSelectedRegionId: (id: string) => void;
    loading: boolean;
    error: boolean;
    defaultRegionShortName: string | undefined;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
    const [regions, setRegions] = useState<Region[]>([]);
    const [selectedRegionId, setSelectedRegionId] = useState<string>(DEFAULT_REGION_ID);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        sdk.store.region.list()
            .then(({ regions }) => {
                
                const mappedRegions: Region[] = regions.map(r => ({
                    id: r.id,
                    name: r.name,
                    metadata: r.metadata && typeof r.metadata === 'object' ? { shortName: r.metadata.shortName } : undefined,
                }));

                setRegions(mappedRegions);

                const defaultRegion = mappedRegions.find(r => r.id === DEFAULT_REGION_ID) || mappedRegions[0];

                setSelectedRegionId(defaultRegion?.id);
                
                setError(false);
            })
            .catch(() => {
                setRegions([]);
                setSelectedRegionId(DEFAULT_REGION_ID);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <RegionContext.Provider value={{ regions, selectedRegionId, setSelectedRegionId, loading, error, defaultRegionShortName: DEFAULT_REGION_SHORT_NAME }}>
            {children}
        </RegionContext.Provider>
    );
};

export const useRegion = () => {
    const ctx = useContext(RegionContext);
    if (!ctx) throw new Error("useRegion must be used within a RegionProvider");
    return ctx;
};
