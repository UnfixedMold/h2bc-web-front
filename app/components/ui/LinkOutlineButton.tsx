"use client";
import Link from 'next/link'

type Props = {
  href: string
  fullWidth?: boolean
  className?: string
}

export default function LinkOutlineButton({ href, fullWidth, className = '', children }: React.PropsWithChildren<Props>) {
  const base = `${fullWidth ? 'w-full' : ''} inline-block text-center px-6 py-3 border border-black text-black hover:underline cursor-pointer`.trim()
  const cls = className ? `${base} ${className}` : base
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
