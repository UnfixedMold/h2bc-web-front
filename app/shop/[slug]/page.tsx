import Link from 'next/link'

interface Props { params: { slug: string } }

export default function ProductDetailPlaceholder({ params }: Props) {
  return (
    <main className="w-full py-16">
      <div className="w-full max-w-3xl mx-auto px-6 text-center space-y-6">
        <h1 className="text-3xl">{params.slug.replaceAll('-', ' ')}</h1>
        <p className="opacity-80">Product details coming soon.</p>
        <Link href="/shop" className="hover-glow-pink">Back to shop</Link>
      </div>
    </main>
  )
}
