export function formatPrice(amount: number | null, currencyCode: string): string {
  if (amount === null) {
    return 'NOT AVAILABLE'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(amount)
}