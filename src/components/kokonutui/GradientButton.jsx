import React from 'react'

export function GradientButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'glow' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon = null,
  iconPosition = 'left'
}) {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-xl gap-2.5 font-medium'
  }

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#dfc086] via-[#ceab68] to-[#be9850] text-[#14100a] font-semibold tracking-wide shadow-md shadow-[#ceab68]/20 hover:shadow-lg hover:shadow-[#ceab68]/30 border border-[#edd7aa]/60 hover:brightness-105 active:scale-[0.98]',
    secondary:
      'bg-[#171514]/90 text-[#e6ded3] border border-[#2e2823] hover:border-[#c5a358]/60 hover:bg-[#1f1b19] hover:text-white shadow-sm active:scale-[0.98]',
    glow:
      'relative bg-gradient-to-r from-[#faecd2] via-[#dfc086] to-[#cba660] text-[#14100a] font-bold shadow-lg shadow-[#ceab68]/25 hover:shadow-xl hover:shadow-[#ceab68]/40 border border-[#fef7eb] active:scale-[0.98]',
    danger:
      'bg-[#201012] text-[#f2b3b7] border border-[#4a2227] hover:bg-[#2c1417] active:scale-[0.98]'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
    >
      {/* Subtle sweep highlight on hover */}
      <span className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </span>

      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      )}
    </button>
  )
}
export default GradientButton
