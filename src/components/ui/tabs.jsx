import * as React from 'react'
import { Tabs as TabsPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, children, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-[#dfdcd5]/70 p-1 text-[#595855] border border-[#dfdcd5] gap-1',
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
}

export function TabsTrigger({ className, children, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-[12px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#000000] data-[state=active]:text-[#ffffff] data-[state=active]:shadow-sm cursor-pointer select-none active:scale-95',
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

export function TabsContent({ className, children, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000]',
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  )
}
