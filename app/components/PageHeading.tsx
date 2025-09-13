import { ReactNode } from 'react'
import { unifrakturMaguntia } from '../fonts'

interface PageHeadingProps {
  children: ReactNode
  className?: string
}

export default function PageHeading({ children, className = '' }: PageHeadingProps) {
  return (
    <h1 className={`${unifrakturMaguntia.className} text-4xl mb-10 px-6 ${className}`.trim()}>
      {children}
    </h1>
  )
}
