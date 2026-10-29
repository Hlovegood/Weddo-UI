import * as React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = {
  default: 'bg-[#000000] text-[#ffffff] border border-[#000000] hover:bg-[#1a1a1a]',
  secondary: 'bg-[#e7e5e4] text-[#000000] border border-[#dfdcd5] hover:bg-[#dfdcd5]',
  outline: 'border border-[#dfdcd5] text-[#595855] bg-transparent hover:border-[#000000] hover:text-[#000000]',
  gold: 'bg-[#fbf6ee] text-[#7d6034] border border-[#997541]/30',
  emerald: 'bg-[#0b2e26] text-[#ffffff] border border-[#0b2e26]/40',
  live: 'bg-[#000000] text-[#ffffff] border border-[#000000] shadow-xs'
}

export function Badge({
  className,
  variant = 'default',
  pulse = false,
  children,
  ...props
}) {
  const variantClass = badgeVariants[variant] || badgeVariants.default

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium tracking-tight rtl:tracking-normal transition-colors duration-150 select-none',
        variantClass,
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
      {children}
    </span>
  )
}
