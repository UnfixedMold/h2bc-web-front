import { notFound } from 'next/navigation'
import ProductDetail, { ProductDetailData } from './components/ProductDetail'

interface Props { params: Promise<{ slug: string }> }

const PRODUCT_DB: Record<string, ProductDetailData> = {
    'meduza-tee': {
        slug: 'meduza-tee',
        name: 'MEDUZA TEE',
        price: 34.85,
        images: ['/products/meduza_tee/1.png', '/products/meduza_tee/2.png'],
        sizes: ['S', 'M', 'L', 'XL'],
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                specs: [
                    '190 g/m²',
                    '100% ring-spun combed cotton; single jersey (Heather Gray: 90% cotton, 10% polyester)',
                    'Dropped shoulder',
                    'Relaxed, modern shape',
                    'Unisex style – great for both men and women',
                    'Wide rib collar',
                    'Taped shoulder to shoulder',
                ]
    },
    'meduza-hood': {
        slug: 'meduza-hood',
        name: 'MEDUZA HOOD',
        price: 66.66,
        images: ['/products/meduza_hood/front.png', '/products/meduza_hood/back.png'],
        sizes: ['S', 'M', 'L', 'XL'],
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                specs: [
                    '320 g/m²',
                    '80% cotton, 20% polyester fleece',
                    'Dropped shoulder',
                    'Relaxed, modern shape',
                    'Unisex fit',
                    'Kangaroo pocket',
                    'Ribbed cuffs and hem',
                ]
    },
    'h2bc-bean': {
        slug: 'h2bc-bean',
        name: 'H2BC BEANIE',
        price: 24.99,
        images: ['/products/h2bc_beanie/front.png'],
        sizes: [],
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                specs: [
                    'Double-layer knit',
                    '100% acrylic',
                    'One size fits most',
                    'Soft hand-feel',
                ],
        soldOut: true,
    },
    'cat-studded-belt': {
        slug: 'cat-studded-belt',
        name: 'STUDDED PU$$Y BELT',
        price: 59.99,
        images: ['/products/studded_cat_belt/front.png'],
        sizes: [],
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                specs: [
                    'Genuine leather strap',
                    'Metal studs and buckle',
                    'Width: 3.5 cm',
                    'Nickel finish',
                ],
        soldOut: true,
    },
    'trainer-shorts': {
        slug: 'trainer-shorts',
        name: 'TRAINER SHORTS',
        price: 45.55,
        images: ['/products/trainer_shorts/front-blank.png', '/products/trainer_shorts/back-blank.png'],
        sizes: ['S', 'M', 'L', 'XL'],
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                specs: [
                    '160 g/m²',
                    '100% polyester; breathable mesh lining',
                    'Elastic waistband with drawcord',
                    'Side pockets',
                    'Relaxed fit',
                ]
    }
}

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params
    const data = PRODUCT_DB[slug]

    if (!data) notFound()

    return (
        <main className="w-full py-10 sm:py-14">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <ProductDetail data={data} />
            </div>
        </main>
    )
}
