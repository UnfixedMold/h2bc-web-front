
import Image from 'next/image';

export default function NotFound() {
    return (
        <main className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center">
            <Image
                src="/404.gif"
                alt="404 Not Found gif"
                width={320}
                height={240}
                className="mb-8 max-w-xs"
                priority
            />
        </main>
    )
}
