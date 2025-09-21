"use client";
import { HTMLAttributes } from 'react'
import TextButton from './TextButton'

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
      <TextButton
        variant="secondary"
        ariaSelected={false}
        disabled={!canDecrement}
        className="px-2 py-1"
        onClick={() => canDecrement && onChange(Math.max(min, value - 1))}
      >
        -
      </TextButton>
      <span className="px-4 py-1 min-w-10 text-center">{value}</span>
      <TextButton
        variant="secondary"
        ariaSelected={false}
        disabled={!canIncrement}
        className="px-2 py-1"
        onClick={() => canIncrement && onChange(Math.min(typeof max === 'number' ? max : value + 1, value + 1))}
      >
        +
      </TextButton>
    </div>
  )
}
