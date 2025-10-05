import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from 'next/server'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateQueryParams<T extends z.ZodType>(
  request: Request,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; response: NextResponse } {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries())

  const validation = schema.safeParse(params)
  if (!validation.success) {
    return {
      success: false,
      response: NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      )
    }
  }

  return { success: true, data: validation.data }
}

export function formatPrice(amount?: number | null, currencyCode?: string): string {
  if (!amount) {
    return 'NOT AVAILABLE'
  }

  const code = (currencyCode || process.env.NEXT_PUBLIC_DEFAULT_REGION_CURRENCY_CODE || 'EUR').toUpperCase()

  // Get currency symbol using Intl
  const symbol = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    currencyDisplay: 'narrowSymbol'
  }).formatToParts(0).find(part => part.type === 'currency')?.value || code

  const formatted = amount.toLocaleString('lt-LT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `${symbol}${formatted} ${code}`
}
