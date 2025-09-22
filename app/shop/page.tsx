import ShopContent from './components/ShopContent'

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
    soldOut?: boolean
    category: 'PRINT ON DEMAND' | 'BELTS' | 'BEANIES' | 'JEWELERY'
}

const PRODUCTS: ProductItem[] = [
    {
        slug: 'meduza-tee',
        name: 'MEDUZA TEE',
        price: 34.85,
        image: '/products/meduza_tee/1.png',
        hoverImage: '/products/meduza_tee/2.png',
        category: 'PRINT ON DEMAND',
    },
    {
        slug: 'meduza-hood',
        name: 'MEDUZA HOOD',
        price: 66.66,
        image: '/products/meduza_hood/front.png',
        hoverImage: '/products/meduza_hood/back.png',
        category: 'PRINT ON DEMAND',
    },
    {
        slug: 'h2bc-bean',
        name: 'H2BC BEANIE',
        price: 24.99,
        image: '/products/h2bc_beanie/front.png',
        hoverImage: '/products/h2bc_beanie/front.png',
        soldOut: true,
        category: 'BEANIES',
    },
    {
        slug: 'cat-studded-belt',
        name: 'STUDDED PU$$Y BELT',
        price: 59.99,
        image: '/products/studded_cat_belt/front.png',
        hoverImage: '/products/studded_cat_belt/front.png',
        soldOut: true,
        category: 'BELTS',
    },
    {
        slug: 'trainer-shorts',
        name: 'TRAINER SHORTS',
        price: 45.55,
        image: '/products/trainer_shorts/front-blank.png',
        hoverImage: '/products/trainer_shorts/back-blank.png',
        category: 'PRINT ON DEMAND',
    },
]

export default function ShopPage() {
    return (
        <main className="w-full pt-8 sm:pt-10 pb-12">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <ShopContent products={PRODUCTS} />
            </div>
        </main>
    )
}
