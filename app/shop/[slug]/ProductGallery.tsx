"use client";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../components/ProductCard/ProductCard.module.css'
import LinkTextButton from '@/app/components/ui/LinkTextButton'
import { screens } from '@/lib/breakpoints'

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(0)
  return (
    <section>
      <div className="mb-4">
        <LinkTextButton href="/shop">{'<'} Back</LinkTextButton>
      </div>
      <div className={`${styles.glow} relative w-full aspect-square`}>
        <Image
          src={images[activeImage]}
          alt={name}
          fill
          sizes={`(min-width:${screens.lg}) 50vw, 100vw`}
          className={`${styles.glowImg} object-contain`}
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3">
          {images.map((src, idx) => (
            <button
              key={src + idx}
              className={`relative aspect-square border ${idx === activeImage ? 'border-black' : 'border-black/30'} cursor-pointer`}
              onClick={() => setActiveImage(idx)}
              aria-label={`Show image ${idx + 1}`}
            >
              <Image src={src} alt={`${name} thumbnail ${idx + 1}`} fill className="object-contain" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
