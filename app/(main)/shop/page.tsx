import CategoryFilter from '@/components/shop/category-filter'
import ProductGrid from '@/components/shop/product-grid'
import ClientToastErrorHandler from '@/components/feedback/client-toast-error-handler'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { getCategories } from '@/actions/categories'
import { getProducts } from '@/actions/products'

export const metadata = {
    title: 'Shop',
    description: 'Browse products',
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { products, error: productsError } = await getProducts()

    if (productsError) {
        return (
            <div className="flex justify-center pt-15">
                <Alert variant="destructive" className="max-w-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {productsError}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    const { categories, error: categoriesError } = await getCategories()

    const params = await searchParams
    const activeCategory = params.category || 'ALL'

    // Sort: in-stock first, sold out last
    const sorted = [...products.filter(p => !p.soldOut), ...products.filter(p => p.soldOut)]

    // Filter by category
    const filtered = activeCategory === 'ALL' ? sorted : sorted.filter(p => p.category === activeCategory)

    return (
        <ClientToastErrorHandler error={categoriesError}>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
                <CategoryFilter categories={['ALL', ...categories]} active={activeCategory} />
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12">
                    <ProductGrid products={filtered} />
                </section>
            </div>
        </ClientToastErrorHandler>
    )
}
