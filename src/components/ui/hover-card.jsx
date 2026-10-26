import * as React from 'react'
import { HoverCard as HoverCardPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

export function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 8,
  children,
  ...props
}) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-80 rounded-[14px] bg-[#e7e5e4]/95 dark:bg-[#1c1b18]/95 backdrop-blur-xl p-4 text-[#000000] dark:text-[#f5f5f3] shadow-2xl border border-[#dfdcd5] dark:border-[#2e2d28] outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
        <HoverCardPrimitive.Arrow className="fill-[#e7e5e4] dark:fill-[#1c1b18]" />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
}
