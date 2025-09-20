import ProductCard from './components/ProductCard'

export const metadata = {
    title: 'Shop',
    description: 'Browse products',
}

interface ProductItem {
    slug: string
    name: string
    price: number
    pricePrefix?: string
    image: string
    hoverImage?: string
}

const PRODUCTS: ProductItem[] = [
    {
        slug: 'meduza-tee',
        name: 'MEDUZA TEE',
        price: 34.85,
        image: '/products/meduza_tee/1.png',
        hoverImage: '/products/meduza_tee/2.png',
    },
    {
        slug: 'meduza-hood',
        name: 'MEDUZA HOOD',
        price: 66.66,
        image: '/products/meduza_hood/front.png',
        hoverImage: '/products/meduza_hood/back.png',
    },
    {
        slug: 'h2bc-bean',
        name: 'H2BC BEANIE',
        price: 24.99,
        image: '/products/h2bc_beanie/front.png',
        hoverImage: '/products/h2bc_beanie/front.png'
    },
]

export default function ShopPage() {
    return (
        <main className="w-full py-10 sm:py-14">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
                    {PRODUCTS.map(p => (
                        <ProductCard key={p.slug} {...p} />
                    ))}
                </div>
            </div>
        </main>
    )
}
