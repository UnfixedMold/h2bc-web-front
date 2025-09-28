import { ReactNode } from "react";
import { twMerge } from 'tailwind-merge';
import Heading from "./Heading";

interface PageLayoutProps {
  heading: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function PageLayout({
  heading,
  children,
  className = "",
}: PageLayoutProps) {
  return (
    <div className="flex justify-center">
      <main className={twMerge('flex flex-col w-full max-w-4xl px-6 pt-8 sm:pt-10 pb-12', className)}>
        <div className="mb-8">
          <Heading level={1} font="blackletter">{heading}</Heading>
        </div>
        {children}
      </main>
    </div>
  );
}
