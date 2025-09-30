import ShopContent from './components/ShopContent'
import type { ProductItem } from './components/ShopContent'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { getRegionCookie } from '@/app/actions/regions'

export const metadata = {
    title: 'Shop',
    description: 'Browse products',
}

export default async function ShopPage() {
    const regionId = await getRegionCookie()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?region_id=${regionId}`)
    const data = await response.json()

    if (data.error) {
        return (
            <div className="flex justify-center pt-15">
                <Alert variant="destructive" className="max-w-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {data.error}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return <ShopContent products={data.products as ProductItem[]} />
}
