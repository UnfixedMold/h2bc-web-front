"use client";
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean
  uppercase?: boolean
}

export default function SecondaryButton({ fullWidth=true, className = '', disabled=false, uppercase=false, children, type, ...rest }: Props) {
  const base = `${fullWidth ? 'w-full' : ''} ${uppercase ? 'text-uppercase' : ''} px-6 py-3 border border-black text-black ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:hover:underline cursor-pointer'}`.trim()
  const cls = className ? `${base} ${className}` : base
  return (
    <button type={type ?? 'button'} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  )
}
