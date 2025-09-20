"use client";
import { HTMLAttributes } from 'react'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value: number
  onChange: (newValue: number) => void
  min?: number
  max?: number
  className?: string
  decrementAriaLabel?: string
  incrementAriaLabel?: string
}

export default function StepperButton({
  value,
  onChange,
  min = 0,
  max,
  className = '',
  decrementAriaLabel = 'Decrease quantity',
  incrementAriaLabel = 'Increase quantity',
  ...rest
}: Props) {
  const canDecrement = value > min
  const canIncrement = typeof max === 'number' ? value < max : true

  return (
    <div className={`inline-flex items-stretch border border-black${className ? ' ' + className : ''}`} {...rest}>
      <button
        type="button"
        aria-label={decrementAriaLabel}
        disabled={!canDecrement}
        className={`px-3 py-1 text-black select-none${canDecrement ? ' cursor-pointer hover:font-bold' : ' cursor-not-allowed text-black/40'}`}
        onClick={() => canDecrement && onChange(Math.max(min, value - 1))}
      >
        -
      </button>
      <span className="px-4 py-1 min-w-10 text-center">{value}</span>
      <button
        type="button"
        aria-label={incrementAriaLabel}
        disabled={!canIncrement}
        className={`px-3 py-1 text-black select-none${canIncrement ? ' cursor-pointer hover:font-bold' : ' cursor-not-allowed text-black/40'}`}
        onClick={() => canIncrement && onChange(Math.min(typeof max === 'number' ? max : value + 1, value + 1))}
      >
        +
      </button>
    </div>
  )
}
