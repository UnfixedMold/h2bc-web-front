import Link from 'next/link'
import Image from 'next/image'
import { cn, formatPrice } from '@/lib/utils'
import { screens } from '@/lib/breakpoints'
import ProductCardSkeleton from './ProductCardSkeleton'

export { ProductCardSkeleton }

export interface ProductCardProps {
    slug: string
    name: string
    price: number | null
    image: string
    hoverImage?: string
    soldOut?: boolean
    priority?: boolean
    loading?: boolean
    currencyCode: string
}

export default function ProductCard({ slug, name, price, image, hoverImage, soldOut, priority, loading, currencyCode }: ProductCardProps) {
    const href = `/shop/${slug}`

    if (loading) {
        return <ProductCardSkeleton />
    }

    return (
        <div className="group w-full max-w-sm mx-auto">
            <Link
                href={href}
                aria-label={`View ${name}`}
                className="block"
            >
                <div className={`relative w-full aspect-square`}>
                    <div className={cn('relative w-full h-full', soldOut && 'opacity-40')}>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes={`(min-width:${screens.lg}) 25vw, (min-width:${screens.sm}) 50vw, 100vw`}
                               className={cn('pink-img-shadow object-contain transition-opacity duration-200 ease-out', hoverImage && 'group-hover:opacity-0 group-focus-visible:opacity-0')}
                            draggable={false}
                            priority={!!priority}
                        />
                        {hoverImage && (
                            <Image
                                src={hoverImage}
                                alt={name}
                                fill
                                sizes={`(min-width:${screens.lg}) 25vw, (min-width:${screens.sm}) 50vw, 100vw`}
                                   className={`pink-img-shadow object-contain transition-opacity duration-200 ease-out opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
                                draggable={false}
                                loading="lazy"
                            />
                        )}
                    </div>
                    {soldOut && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-script text-foreground/90 text-5xl select-none">Sold Out</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="mt-4 text-center">
                <Link href={href} className="inline-block group-hover:underline text-lg tracking-wide">
                    {name}
                </Link>
            </div>
            <div className="mt-1 text-center text-base font-medium">
                {formatPrice(price, currencyCode)}
            </div>
        </div>
    )
}
