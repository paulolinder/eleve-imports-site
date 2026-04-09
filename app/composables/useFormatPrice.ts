export function useFormatPrice() {
  function format(value: number, currency = 'BRL'): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  function discount(original: number, current: number): number {
    return Math.round(((original - current) / original) * 100)
  }

  return { format, discount }
}
