"use client";
import Link from 'next/link'
import { ReactNode } from 'react'

type ImageButtonSize = 'sm' | 'md' | 'lg'

type Props = {
  href?: string
  children: ReactNode
  external?: boolean
  ariaLabel?: string
  className?: string
  size?: ImageButtonSize
  onClick?: () => void
}

const imageButtonSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

export default function ImageButton({ href, children, external, ariaLabel, className = '', size = 'md', onClick }: Props) {
  const base = 'inline-flex items-center text-foreground transition-all duration-200 align-middle cursor-pointer hover:text-accent';
  const sizeClasses = imageButtonSizes[size];
  const cls = className ? `${base} ${sizeClasses} ${className}` : `${base} ${sizeClasses}`;

  if (onClick) {
    return (
      <button onClick={onClick} aria-label={ariaLabel} className={cls}>
        {children}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href!} aria-label={ariaLabel} className={cls}>
      {children}
    </Link>
  );
}
