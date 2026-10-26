import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatEGP(amount, lang = 'en') {
  if (typeof amount !== 'number') return amount
  if (lang === 'ar') {
    return `${amount.toLocaleString('ar-EG')} ج.م`
  }
  return `${amount.toLocaleString('en-US')} EGP`
}
