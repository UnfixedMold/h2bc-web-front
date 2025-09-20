"use client";
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  external?: boolean
  ariaLabel?: string
  className?: string
}

export default function ImageButton({ href, children, external, ariaLabel, className = '' }: Props) {
  const base = 'inline-flex items-center text-black hover:text-pink-400 transition-colors align-middle'
  const cls = className ? `${base} ${className}` : base
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={cls}>
      {children}
    </Link>
  )
}
