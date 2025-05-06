
/**
 * Format price according to Angolan style (150.000Kz)
 * @param value - The price value to format
 * @returns Formatted price string
 */
export function formatPrice(value: number): string {
  return value.toLocaleString('pt-AO').replace(',', '.') + 'Kz';
}
