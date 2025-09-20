"use client";
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  className?: string
}

export default function LinkTextButton({ href, children, className = '' }: Props) {
  const base = 'cursor-pointer text-black hover:underline'
  const cls = className ? `${base} ${className}` : base
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
