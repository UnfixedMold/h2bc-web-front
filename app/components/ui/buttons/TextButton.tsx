"use client";
import { MouseEventHandler, ReactNode } from 'react'
import Link from 'next/link'

type TextButtonProps = {
  children: ReactNode
  href?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  ariaSelected?: boolean
  variant?: 'primary' | 'secondary'
  showArrow?: boolean
  disabled?: boolean
}

export default function TextButton({
  children,
  href,
  active,
  onClick,
  className = '',
  ariaSelected,
  variant = 'primary',
  showArrow = true,
  disabled,
}: TextButtonProps) {
  const base = (
    disabled
      ? 'cursor-not-allowed text-black/40'
      : variant === 'primary'
        ? `cursor-pointer text-black ${active ? 'font-bold' : ''} hover:underline`
        : `cursor-pointer text-black ${active ? 'underline' : ''} hover:font-bold`
  ).trim()
  const cls = className ? `${base} ${className}` : base

  if (href) {
    return (
      <Link href={href} className={cls} aria-selected={ariaSelected}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={ariaSelected}
      disabled={disabled}
      className={cls}
    >
      {variant === 'primary' && active && showArrow ? <span>{'> '}{children}</span> : children}
    </button>
  )
}
