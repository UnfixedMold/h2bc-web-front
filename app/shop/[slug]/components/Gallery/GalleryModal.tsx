"use client";
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import TextButton from '@/app/components/ui/TextButton'

export default function GalleryModal({
  open,
  onClose,
  images,
  activeIndex,
  setActiveIndex,
  name,
}: {
  open: boolean
  onClose: () => void
  images: string[]
  activeIndex: number
  setActiveIndex: (idx: number) => void
  name: string
}) {
  const canNavigate = images.length > 1
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const mobileScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open) dialogRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (open && mobileScrollRef.current) {
      const el = mobileScrollRef.current
      el.scrollTo({ left: el.clientWidth * activeIndex, behavior: 'auto' })
    }
  }, [open, activeIndex])

  if (!open) return null

  const goPrev = () => setActiveIndex((activeIndex - 1 + images.length) % images.length)
  const goNext = () => setActiveIndex((activeIndex + 1) % images.length)

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-white/95 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      ref={dialogRef}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft') goPrev()
        if (e.key === 'ArrowRight') goNext()
      }}
    >
      <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-[80vh]">
          {/* Mobile: swipe horizontally between images */}
          <div
            className="block sm:hidden w-full h-full overflow-x-auto snap-x snap-mandatory flex"
            ref={mobileScrollRef}
            onScroll={(e) => {
              const el = e.currentTarget
              const idx = Math.round(el.scrollLeft / el.clientWidth)
              if (idx !== activeIndex) setActiveIndex(idx)
            }}
          >
            {images.map((src, idx) => (
              <div key={src + idx} className="relative w-full h-full shrink-0 snap-center">
                <Image src={src} alt={name + ' ' + (idx + 1)} fill className="object-contain" sizes="100vw" priority={idx === activeIndex} />
              </div>
            ))}
          </div>
          {/* Desktop: single image with arrows */}
          <div className="hidden sm:block relative w-full h-full">
            <Image
              src={images[activeIndex]}
              alt={name}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            {canNavigate && (
              <>
                <TextButton
                  variant="secondary"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl px-2 py-1"
                  aria-selected={false}
                  aria-label="Previous image"
                >
                  {'<'}
                </TextButton>
                <TextButton
                  variant="secondary"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl px-2 py-1"
                  aria-selected={false}
                  aria-label="Next image"
                >
                  {'>'}
                </TextButton>
              </>
            )}
          </div>
          <TextButton
            variant="secondary"
            onClick={onClose}
            className="absolute top-2 right-2 text-xl px-2 py-1"
            aria-selected={false}
          >
            {'X'}
          </TextButton>
        </div>
      </div>
    </div>
  )
}
