import React from 'react'

export function BlurText({
  text = '',
  delay = 40,
  className = '',
  as: Component = 'span'
}) {
  const words = text.split(' ')

  return (
    <Component className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block animate-blur-in opacity-0"
          style={{
            animationDelay: `${i * delay}ms`,
            animationFillMode: 'forwards'
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  )
}

export default BlurText
