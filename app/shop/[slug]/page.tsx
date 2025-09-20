import Link from 'next/link'

interface Props { params: Promise<{ slug: string }> }

export default async function ProductDetailPlaceholder({ params }: Props) {

    const { slug } = await params

    return (
        <main className="w-full py-16">
            <div className="w-full max-w-3xl mx-auto px-6 text-center space-y-6">
                <h1 className="text-3xl">{slug.replaceAll('-', ' ')}</h1>
                <p className="opacity-80">Product details coming soon.</p>
                <Link href="/shop" className="hover-glow-pink">Back to shop</Link>
            </div>
        </main>
    )
}
