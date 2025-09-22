
import Image from 'next/image';
import LinkTextButton from './components/ui/LinkTextButton';

export default function NotFound() {
    return (
        <main className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center">
            <div className="inline-block">
                <Image
                    src="/404.gif"
                    alt="404 Not Found gif"
                    width={320}
                    height={240}
                    className="mb-10 sm:mb-12 max-w-xs"
                    priority
                />
                <LinkTextButton href="/shop">{"<"} BACK TO SHOP</LinkTextButton>
            </div>
        </main>
    )
}
