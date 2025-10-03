import { notFound } from 'next/navigation'
import { ProductDetailData } from './components/types'
import ProductGallery from './components/Gallery/ProductGallery'
import ProductActions from './components/ProductActions'
import ProductDescription from './components/ProductDescription'
import Heading from '@/app/components/Heading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { getRegionCookie } from '@/app/actions/regions'

interface Props { params: Promise<{ slug: string }> }

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params
    const regionId = await getRegionCookie()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}?region_id=${regionId}`)
    const data = await response.json()

    if (data.error) {
        if (response.status === 404) {
            notFound()
        }

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

    const product = data.product as ProductDetailData

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Gallery */}
            <ProductGallery images={product.images} name={product.name} />

            {/* Right: Details */}
            <section>
                <Heading level={1}>{product.name}</Heading>

                <ProductActions
                    slug={product.slug}
                    sizes={product.sizes}
                    variants={product.variants}
                    options={product.options}
                    alert={product.alert}
                    descriptionSlot={
                        <ProductDescription
                            subtitle={product.subtitle}
                            description={product.description}
                        />
                    }
                />
            </section>
        </div>
    )
}
