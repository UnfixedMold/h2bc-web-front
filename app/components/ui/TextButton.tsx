"use client";
import { MouseEventHandler, ReactNode } from 'react'

export default function TextButton({
  children,
  active,
  onClick,
  className = '',
  ariaSelected,
  variant = 'primary',
  showArrow = true,
  disabled,
}: {
  children: ReactNode
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  ariaSelected?: boolean
  variant?: 'primary' | 'secondary'
  showArrow?: boolean
  disabled?: boolean
}) {
  const base = (
    disabled
      ? 'cursor-not-allowed text-black/40'
      : variant === 'primary'
        ? `cursor-pointer text-black ${active ? 'font-bold' : ''} hover:underline`
        : `cursor-pointer text-black ${active ? 'underline' : ''} hover:font-bold`
  ).trim()
  const cls = className ? `${base} ${className}` : base
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
