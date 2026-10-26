import * as React from 'react'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-[#dfdcd5]', className)}
      {...props}
    />
  )
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-left font-serif text-[17px] font-medium transition-all hover:text-[#595855] [&[data-state=open]>svg]:rotate-180 cursor-pointer select-none active:scale-[0.99]',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-[#595855]" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        'overflow-hidden text-[13px] text-[#595855] leading-relaxed transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4',
        className
      )}
      {...props}
    >
      <div className={className}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
