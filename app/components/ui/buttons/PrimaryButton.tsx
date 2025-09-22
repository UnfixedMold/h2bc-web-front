"use client";
import { ButtonHTMLAttributes } from 'react'


type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean
  uppercase?: boolean
}

export default function PrimaryButton({
  fullWidth,
  className,
  disabled,
  type,
  children,
  uppercase,
  ...rest
}: Props) {
  const base = `${fullWidth ? 'w-full' : ''} px-6 py-3 text-white bg-black ${uppercase ? ' uppercase' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline cursor-pointer'}`.trim();
  const cls = className ? `${base} ${className}` : base;
  return (
    <button type={type ?? 'button'} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  );
}
