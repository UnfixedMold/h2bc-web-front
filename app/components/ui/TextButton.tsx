"use client";
import { MouseEventHandler, ReactNode } from 'react'

export default function TextButton({
  children,
  active,
  onClick,
  className = '',
  ariaSelected,
}: {
  children: ReactNode
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  ariaSelected?: boolean
}) {
  const base = `cursor-pointer text-black hover:underline ${active ? 'font-bold' : ''}`.trim()
  const cls = className ? `${base} ${className}` : base
  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={ariaSelected}
      className={cls}
    >
      {active ? <span>{'> '}{children}</span> : children}
    </button>
  )
}
