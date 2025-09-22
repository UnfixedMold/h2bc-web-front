import { ReactNode } from "react";
import PageHeading from "./PageHeading";

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
      <main className={`flex flex-col w-full max-w-4xl px-6 pt-8 sm:pt-10 pb-12 ${className}`}>
        <div className="mb-8">
          <PageHeading>{heading}</PageHeading>
        </div>
        {children}
      </main>
    </div>
  );
}
