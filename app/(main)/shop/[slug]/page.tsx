import { notFound } from 'next/navigation'
import ProductGallery from './components/Gallery/ProductGallery'
import ProductDetails from './components/ProductDetails'
import ProductDescription from './components/ProductDescription'
import Heading from '@/app/components/Heading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { getProductDetails } from '@/app/actions/products'

interface Props { params: Promise<{ slug: string }> }

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params

    const { product, error, notFound: isNotFound } = await getProductDetails(slug)

    if (isNotFound) {
        notFound()
    }

    if (error) {
        return (
            <div className="flex justify-center pt-15">
                <Alert variant="destructive" className="max-w-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Gallery */}
            <ProductGallery images={product!.images} name={product!.name} />

            {/* Right: Details */}
            <section>
                <Heading level={1}>{product!.name}</Heading>

                <ProductDetails
                    slug={product!.slug}
                    sizes={product!.sizes}
                    variants={product!.variants}
                    options={product!.options}
                    alert={product!.alert}
                    descriptionSlot={
                        <ProductDescription
                            subtitle={product!.subtitle}
                            description={product!.description}
                        />
                    }
                />
            </section>
        </div>
    )
}
