import React from 'react'

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = ''
}) {
  return (
    <span
      className={`inline-block relative text-transparent bg-clip-text bg-[linear-gradient(110deg,#dfc086,45%,#fff,55%,#dfc086)] bg-[length:250%_100%] ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  )
}

export default ShinyText
