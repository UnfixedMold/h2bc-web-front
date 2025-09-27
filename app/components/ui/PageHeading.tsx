import { ReactNode } from 'react'

interface PageHeadingProps {
  children: ReactNode
  className?: string
}

export default function PageHeading({ children, className = '' }: PageHeadingProps) {
  return (
    <h1 className={`font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wide font-bold ${className}`.trim()}>
      {children}
    </h1>
  )
}
