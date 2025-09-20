"use client";
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import styles from './ProductCard.module.css'
import { screens } from '@/lib/breakpoints'

export interface ProductCardProps {
  slug: string
  name: string
  price: number
  currency?: string
  pricePrefix?: string
  image: string
  hoverImage?: string
}

function formatPriceEUR(value: number, currency = 'EUR') {
  const formatted = value.toLocaleString('lt-LT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `€${formatted} ${currency}`
}

export default function ProductCard({ slug, name, price, currency = 'EUR', pricePrefix, image, hoverImage }: ProductCardProps) {
  const href = `/shop/${slug}`
  const [isHover, setIsHover] = useState(false)
  const currentSrc = isHover && hoverImage ? hoverImage : image

  return (
    <div className="group w-full max-w-sm mx-auto">
      <Link
        href={href}
        aria-label={`View ${name}`}
        className="block"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onFocus={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
      >
        <div className={`${styles.glow} relative w-full aspect-square`}>
          <Image
            src={currentSrc}
            alt={name}
            fill
            sizes={`(min-width:${screens.lg}) 25vw, (min-width:${screens.sm}) 50vw, 100vw`}
            className={`${styles.glowImg} object-contain`}
            draggable={false}
            priority={false}
          />
        </div>
      </Link>

      <div className="mt-4 text-center">
        <Link href={href} className="inline-block group-hover:underline text-lg tracking-wide">
          {name}
        </Link>
      </div>
      <div className="mt-1 text-center text-base font-medium">
        {pricePrefix ? `${pricePrefix} ` : ''}
        {formatPriceEUR(price, currency)}
      </div>
    </div>
  )
}
