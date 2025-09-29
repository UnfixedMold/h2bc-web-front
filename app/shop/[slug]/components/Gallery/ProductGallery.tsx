"use client";
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import GalleryModal from './GalleryModal'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(0)
  const canNavigate = images.length > 1
  const goPrev = () => setActiveImage(i => (i - 1 + images.length) % images.length)
  const goNext = () => setActiveImage(i => (i + 1) % images.length)
  const [open, setOpen] = useState(false)

  return (
    <section>
      <div className="relative w-full aspect-square">
        <Image
          src={images[activeImage]}
          alt={name}
          fill
          className="pink-img-shadow"
          priority
        />
        <button
          type="button"
          aria-label="Open image in full screen"
          onClick={() => setOpen(true)}
          className="absolute inset-0 z-0 cursor-zoom-in"
        />
        {canNavigate && (
          <>
            <Button
              variant="ghost"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 p-0 hover:bg-white"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 p-0 hover:bg-white"
            >
              <ChevronRight />
            </Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3">
          {images.map((src, idx) => (
            <button
              key={src + idx}
              className={cn('relative aspect-square border cursor-pointer', idx === activeImage ? 'border-black' : 'border-black/30')}
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
