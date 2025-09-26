"use client";
import Link from 'next/link'
import { ReactNode } from 'react'

type ImageButtonSize = 'sm' | 'md' | 'lg'

type Props = {
  href: string
  children: ReactNode
  external?: boolean
  ariaLabel?: string
  className?: string
  active?: boolean
  size?: ImageButtonSize
}

const imageButtonSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

export default function ImageButton({ href, children, external, ariaLabel, className = '', active = false, size = 'md' }: Props) {
  const base = 'inline-flex items-center text-black transition-all duration-200 align-middle';
  const stateClasses = active
    ? 'text-pink-500'
    : 'hover:text-pink-500 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]';
  const sizeClasses = imageButtonSizes[size];
  const cls = className ? `${base} ${stateClasses} ${sizeClasses} ${className}` : `${base} ${stateClasses} ${sizeClasses}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={cls}>
      {children}
    </Link>
  );
}
