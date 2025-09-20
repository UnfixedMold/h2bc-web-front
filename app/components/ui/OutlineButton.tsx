"use client";
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean
}

export default function OutlineButton({ fullWidth, className = '', disabled, children, ...rest }: Props) {
  const base = `${fullWidth ? 'w-full' : ''} px-6 py-3 border border-black ${disabled ? 'text-black/40 cursor-not-allowed' : 'text-black hover:underline cursor-pointer'}`.trim()
  const cls = className ? `${base} ${className}` : base
  return (
    <button type="button" disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  )
}
