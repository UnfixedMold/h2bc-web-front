import { unifrakturMaguntia } from '../fonts'

export const metadata = {
    title: 'Shipping & Returns',
    description: 'Shipping information and returns policy',
}

export default function ShippingReturnsPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 pt-8 sm:pt-10 pb-12 leading-relaxed text-sm sm:text-base">
            <h1 className={`${unifrakturMaguntia.className} text-3xl sm:text-4xl lg:text-5xl tracking-wide mb-8 font-bold`}>Shipping and Returns</h1>

            <section className="mb-10">
                <h2 className="text-base sm:text-lg font-semibold mb-2">Shipping Policy</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Lithuania:</strong> LP Express lockers. Flat rate <strong>2.99 €</strong> per order. Free shipping for orders over <strong>30 €</strong>. Delivery in <strong>1–3 working days</strong>.</li>
                    <li><strong>European Union:</strong> Flat rate <strong>5.99 €</strong> per order. Free shipping for orders over <strong>50 €</strong>. Delivery in <strong>5–10 working days</strong>.</li>
                    <li>Orders are processed within <strong>1–3 business days</strong> before shipping.</li>
                    <li>Multiple items are combined into one parcel per order.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-base sm:text-lg font-semibold mb-2">Return Policy</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Returns accepted within <strong>14 days</strong> of receiving your order.</li>
                    <li>Items must be unused, in original packaging, and in resellable condition.</li>
                    <li>Return shipping is paid by the customer.</li>
                    <li>To start a return, please visit our <a className="underline" href="/contact">Contact</a> page. We’ll provide the return address.</li>
                    <li>Refunds are issued within <strong>14 days</strong> after we receive the item, to your original payment method.</li>
                </ul>
            </section>
        </main>
    )
}
