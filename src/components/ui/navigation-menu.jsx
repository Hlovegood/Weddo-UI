import * as React from 'react'
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const NavigationMenu = React.forwardRef(({ className, children, viewport = true, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-50 flex max-w-max flex-1 items-center justify-center', className)}
    {...props}
  >
    {children}
    {viewport && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

export const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

export const NavigationMenuItem = NavigationMenuPrimitive.Item

export function navigationMenuTriggerStyle(extraClass = '') {
  return cn(
    'group inline-flex h-9 w-max items-center justify-center rounded-full bg-transparent px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-black/5 hover:text-black focus:bg-black/5 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-black/5 data-[state=open]:bg-black/5 cursor-pointer select-none text-[#595855]',
    extraClass
  )
}

export const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group gap-1 text-[13px]', className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-[1px] h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 text-[#595855]"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

export const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

export const NavigationMenuLink = NavigationMenuPrimitive.Link

export const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn('absolute left-1/2 -translate-x-1/2 top-full flex justify-center z-50 pt-2')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-[14px] border border-[#dfdcd5] bg-[#e7e5e4]/95 backdrop-blur-2xl text-[#000000] shadow-2xl transition-[width,height] duration-300 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

