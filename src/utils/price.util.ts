/** adds ₹ symbol and commas */
export function formatPrice(
  value: number,
  currency = 'INR',
  locale = 'en-IN',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

/** same as formatPrice but omits decimals when value is a whole number */
export function formatPriceNeat(
  value: number,
  currency = 'INR',
  locale = 'en-IN',
): string {
  const isWholeNumber = Number.isInteger(value)
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: isWholeNumber ? 0 : 2,
  }).format(value)
}
