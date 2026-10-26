import * as React from 'react'
import { Toaster as Sonner, toast } from 'sonner'

export function Toaster({ ...props }) {
  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#000000] group-[.toaster]:text-[#ffffff] group-[.toaster]:border-[#ffffff]/20 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:font-sans group-[.toaster]:p-3.5 group-[.toaster]:gap-3',
          description: 'group-[.toast]:text-[#c4c3b6] text-xs font-normal',
          actionButton:
            'group-[.toast]:bg-[#ffffff] group-[.toast]:text-[#000000] group-[.toast]:rounded-full group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:px-3.5 group-[.toast]:py-1 hover:group-[.toast]:bg-[#e7e5e4] active:scale-95 transition-all',
          cancelButton:
            'group-[.toast]:bg-[#262626] group-[.toast]:text-[#ffffff] group-[.toast]:rounded-full active:scale-95 transition-all',
        },
      }}
      {...props}
    />
  )
}

export { toast }
