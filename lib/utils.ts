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

export function formatPrice(amount: number | null, currencyCode: string): string {
  if (amount === null) {
    return 'NOT AVAILABLE'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(amount)
}
