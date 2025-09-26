"use client";
import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  uppercase?: boolean
}

const buttonVariants = {
  primary: 'text-white bg-black hover:underline',
  secondary: 'text-black border border-black hover:underline'
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  uppercase = false,
  className,
  disabled,
  type = 'button',
  children,
  ...rest
}: Props) {
  const baseClasses = 'transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline'

  const classes = twMerge(
    baseClasses,
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && 'w-full',
    uppercase && 'uppercase',
    className
  )

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  )
}