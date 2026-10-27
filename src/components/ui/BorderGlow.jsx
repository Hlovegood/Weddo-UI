'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import './BorderGlow.css';

function parseHSL(hslStr) {
  if (!hslStr || typeof hslStr !== 'string') return { h: 40, s: 80, l: 80 };
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors = ['#c084fc', '#f472b6', '#38bdf8']) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)] || colors[0];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function isLightColor(color) {
  if (!color || typeof color !== 'string') return false;
  const value = color.trim().replace('#', '');
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false;
  const hex = value.length === 3 ? value.split('').map(char => char + char).join('') : value;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180;
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  let rafId;
  const timeoutId = setTimeout(() => {
    function tick() {
      const elapsed = performance.now() - t0;
      const t = Math.min(elapsed / duration, 1);
      onUpdate(start + (end - start) * ease(t));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (onEnd) {
        onEnd();
      }
    }
    rafId = requestAnimationFrame(tick);
  }, delay);

  return () => {
    clearTimeout(timeoutId);
    if (rafId) cancelAnimationFrame(rafId);
  };
}

export const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor,
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  active = false,
  colors,
  fillOpacity = 0.5,
  style = {},
  ...props
}) => {
  const cardRef = useRef(null);

  // Dynamic Theme Detection for Contrasting Glow Fallbacks
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = getEdgeProximity(card, x, y);
    const angle = getCursorAngle(card, x, y);

    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!active) {
      card.style.setProperty('--edge-proximity', '0');
    }
  }, [active]);

  // Active state animation: smooth continuous edge rotation (especially useful for touch/mobile devices)
  useEffect(() => {
    if (!active || !cardRef.current) return;
    const card = cardRef.current;
    card.classList.add('sweep-active');
    card.style.setProperty('--edge-proximity', '95');

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      card.style.setProperty('--cursor-angle', '45deg');
      return () => {
        card.classList.remove('sweep-active');
        card.style.setProperty('--edge-proximity', '0');
      };
    }

    let angle = 45;
    let rafId;
    const rotate = () => {
      angle = (angle + 0.65) % 360;
      card.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`);
      rafId = requestAnimationFrame(rotate);
    };
    rafId = requestAnimationFrame(rotate);

    return () => {
      cancelAnimationFrame(rafId);
      card.classList.remove('sweep-active');
      card.style.setProperty('--edge-proximity', '0');
    };
  }, [active]);

  useEffect(() => {
    if (!animated || active || !cardRef.current) return;
    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add('sweep-active');
    card.style.setProperty('--cursor-angle', `${angleStart}deg`);

    const cleanups = [];
    cleanups.push(animateValue({ duration: 500, onUpdate: v => card?.style.setProperty('--edge-proximity', v.toString()) }));
    cleanups.push(animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      card?.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }}));
    cleanups.push(animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      card?.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }}));
    cleanups.push(animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card?.style.setProperty('--edge-proximity', v.toString()),
      onEnd: () => card?.classList.remove('sweep-active'),
    }));

    return () => {
      cleanups.forEach(c => c && c());
    };
  }, [animated]);

  // Dynamic Contrasting Defaults based on Theme:
  // Dark Theme: Radiant Luminous Egyptian Gold
  // Light Theme: Deep Saturated Amber-Gold / Burnished Copper (Strong contrast against light linen)
  const resolvedGlowColor = glowColor ?? (isDark ? '45 94 65' : '36 96 46');
  const resolvedColors = colors ?? (isDark 
    ? ['#fbe8a6', '#d4af37', '#e5c158', '#b38728'] 
    : ['#78350f', '#b45309', '#d97706', '#f59e0b', '#d4af37']);

  const glowVars = buildGlowVars(resolvedGlowColor, glowIntensity);
  const lightSurface = isLightColor(backgroundColor);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`border-glow-card${lightSurface ? ' border-glow-card--light' : ''} ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars,
        ...buildGradientVars(resolvedColors),
        ...style,
      }}
      {...props}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
