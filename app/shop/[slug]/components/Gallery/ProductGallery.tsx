"use client";
import Image from 'next/image'
import { useState } from 'react'
import styles from '@/app/shop/components/ProductCard/ProductCard.module.css'
import { screens } from '@/lib/breakpoints'
import TextButton from '@/app/components/ui/TextButton'
import GalleryModal from './GalleryModal'

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(0)
  const canNavigate = images.length > 1
  const goPrev = () => setActiveImage(i => (i - 1 + images.length) % images.length)
  const goNext = () => setActiveImage(i => (i + 1) % images.length)
  const [open, setOpen] = useState(false)
  return (
    <section>
      <div className="relative grid grid-cols-[2rem_1fr_2rem] items-center">
        {canNavigate ? (
          <div className="flex justify-center">
            <TextButton
              variant="secondary"
              onClick={goPrev}
              className="text-2xl px-2 py-1"
              aria-selected={false}
              aria-label="Previous image"
            >
              {'<'}
            </TextButton>
          </div>
        ) : <div />}
        <div className={`${styles.glow} relative w-full aspect-square`}>
          <Image
            src={images[activeImage]}
            alt={name}
            fill
            sizes={`(min-width:${screens.lg}) 50vw, 100vw`}
            className={`${styles.glowImg} object-contain`}
            priority
          />
          <button
            type="button"
            aria-label="Open image in full screen"
            onClick={() => setOpen(true)}
            className="absolute inset-0 z-0 cursor-zoom-in"
          />
        </div>
        {canNavigate ? (
          <div className="flex justify-center">
            <TextButton
              variant="secondary"
              onClick={goNext}
              className="text-2xl px-2 py-1"
              aria-selected={false}
              aria-label="Next image"
            >
              {'>'}
            </TextButton>
          </div>
        ) : <div />}
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
      <GalleryModal
        open={open}
        onClose={() => setOpen(false)}
        images={images}
        activeIndex={activeImage}
        setActiveIndex={setActiveImage}
        name={name}
      />
    </section>
  )
}
