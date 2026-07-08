import { useId, useState, useCallback, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { artContexts } from '../data/content'

interface Props {
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  size?: number
  interactive?: boolean
  accentColor?: string
  showTooltip?: boolean
}

export default function RodchenkoArt({
  variant = 1, size = 400, interactive = false,
  accentColor = 'var(--color-accent)', showTooltip = false,
}: Props) {
  const clipId = useId().replace(/:/g, '')
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const reduced = useReducedMotion()
  const elRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef({ x: 0, y: 0 })
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const rafRef = useRef(0)

  const ctx = artContexts[variant] || artContexts[1]

  const syncTooltip = useCallback(() => {
    setTooltipPos({ x: tooltipRef.current.x, y: tooltipRef.current.y })
  }, [])

  const onEnter = useCallback((e: React.PointerEvent) => {
    if (!interactive) return
    setHovered(true)
    if (showTooltip) {
      tooltipRef.current = { x: e.clientX, y: e.clientY }
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(syncTooltip)
    }
  }, [interactive, showTooltip, syncTooltip])

  const onLeave = useCallback(() => {
    if (interactive) { setHovered(false); setClicked(false) }
    cancelAnimationFrame(rafRef.current)
  }, [interactive])

  const onClick = useCallback(() => {
    if (interactive) setClicked(c => !c)
  }, [interactive])

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!showTooltip || !hovered) return
    tooltipRef.current = { x: e.clientX, y: e.clientY }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(syncTooltip)
  }, [showTooltip, hovered, syncTooltip])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!interactive) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setClicked(c => !c)
    }
  }, [interactive])

  const r = accentColor
  const w = '#F5F0EB'
  const b = '#1A1A1A'

  const arts: Record<number, React.ReactElement> = {
    1: (
      <svg viewBox="0 0 400 400" width={size} height={size}>
        <rect width="400" height="400" fill={b} />
        <circle cx="200" cy="200" r="160" fill="none" stroke={r} strokeWidth="2" opacity="0.5" />
        <circle cx="200" cy="200" r="120" fill="none" stroke={r} strokeWidth="1" opacity="0.3" />
        <circle cx="200" cy="200" r="50" fill={r} opacity="0.15" />
        <line x1="40" y1="360" x2="360" y2="40" stroke={r} strokeWidth="3" opacity="0.7" />
        <rect x="250" y="80" width="80" height="80" fill="none" stroke={w} strokeWidth="1" opacity="0.2" transform="rotate(45 290 120)" />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 400 400" width={size} height={size}>
        <rect width="400" height="400" fill={b} />
        <rect x="0" y="0" width="400" height="160" fill={r} opacity="0.08" />
        <line x1="60" y1="0" x2="60" y2="400" stroke={r} strokeWidth="2" opacity="0.25" />
        <line x1="340" y1="0" x2="340" y2="400" stroke={r} strokeWidth="2" opacity="0.25" />
        <rect x="80" y="100" width="240" height="30" fill="none" stroke={r} strokeWidth="2" opacity="0.5" />
        <circle cx="200" cy="280" r="70" fill="none" stroke={r} strokeWidth="3" opacity="0.6" />
        <line x1="200" y1="210" x2="200" y2="350" stroke={r} strokeWidth="1" opacity="0.4" />
        <line x1="130" y1="280" x2="270" y2="280" stroke={r} strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    3: (
      <svg viewBox="0 0 400 400" width={size} height={size}>
        <rect width="400" height="400" fill={b} />
        <polygon points="200,20 380,380 20,380" fill="none" stroke={r} strokeWidth="2" opacity="0.4" />
        <polygon points="200,80 320,320 80,320" fill="none" stroke={r} strokeWidth="1" opacity="0.25" />
        <line x1="200" y1="20" x2="200" y2="380" stroke={w} strokeWidth="1" opacity="0.15" />
        <circle cx="200" cy="240" r="40" fill={r} opacity="0.12" />
        <circle cx="200" cy="240" r="20" fill="none" stroke={r} strokeWidth="2" opacity="0.6" />
      </svg>
    ),
    4: (
      <svg viewBox="0 0 400 400" width={size} height={size}>
        <rect width="400" height="400" fill={b} />
        <rect x="20" y="20" width="60" height="360" fill={r} opacity="0.12" />
        <rect x="100" y="100" width="60" height="280" fill={r} opacity="0.08" />
        <rect x="180" y="50" width="60" height="330" fill={r} opacity="0.1" />
        <rect x="260" y="150" width="60" height="230" fill={r} opacity="0.06" />
        <rect x="340" y="80" width="40" height="300" fill={r} opacity="0.08" />
        <line x1="0" y1="200" x2="400" y2="200" stroke={w} strokeWidth="1" opacity="0.2" />
        <circle cx="200" cy="200" r="90" fill="none" stroke={r} strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    5: (
      <svg viewBox="0 0 400 400" width={size} height={size}>
        <rect width="400" height="400" fill={b} />
        <clipPath id={clipId}><circle cx="200" cy="200" r="170" /></clipPath>
        <g clipPath={`url(#${clipId})`}>
          <line x1="0" y1="60" x2="400" y2="340" stroke={r} strokeWidth="5" opacity="0.6" />
          <line x1="0" y1="120" x2="400" y2="400" stroke={r} strokeWidth="2" opacity="0.3" />
          <line x1="0" y1="180" x2="300" y2="400" stroke={r} strokeWidth="1" opacity="0.2" />
          <rect x="50" y="80" width="100" height="100" fill={r} opacity="0.1" transform="rotate(25 100 130)" />
          <rect x="230" y="220" width="90" height="90" fill={r} opacity="0.08" transform="rotate(-15 275 265)" />
        </g>
        <circle cx="200" cy="200" r="170" fill="none" stroke={r} strokeWidth="2" opacity="0.5" />
      </svg>
    ),
    6: (
      <svg viewBox="0 0 400 400" width={size} height={size}>
        <rect width="400" height="400" fill={b} />
        <rect x="0" y="0" width="180" height="400" fill={r} opacity="0.06" />
        <text x="80" y="140" fontFamily="Unbounded, sans-serif" fontSize={!reduced && clicked ? 100 : 80} fontWeight="900" fill={r} opacity="0.15" transform="rotate(-90 80 140)" style={{ transition: reduced ? 'none' : 'font-size 0.3s ease' }}>AR</text>
        <rect x="160" y="150" width="180" height="180" fill="none" stroke={r} strokeWidth="3" opacity="0.4" />
        <rect x="180" y="170" width="140" height="140" fill="none" stroke={r} strokeWidth="1" opacity="0.25" />
        <line x1="160" y1="240" x2="340" y2="240" stroke={w} strokeWidth="1" opacity="0.2" />
        <line x1="250" y1="150" x2="250" y2="330" stroke={w} strokeWidth="1" opacity="0.2" />
        <circle cx="250" cy="240" r="50" fill="none" stroke={r} strokeWidth="3" opacity="0.6" />
      </svg>
    ),
    7: (
      <svg viewBox="0 0 400 400" width={size} height={size}>
        <rect width="400" height="400" fill={b} />
        <circle cx="160" cy="160" r="120" fill="none" stroke={r} strokeWidth="3" opacity="0.5" />
        <circle cx="240" cy="240" r="100" fill="none" stroke={r} strokeWidth="2" opacity="0.35" />
        <circle cx="200" cy="200" r="60" fill={r} opacity="0.1" />
        <rect x="160" y="160" width="80" height="80" fill="none" stroke={w} strokeWidth="1" opacity="0.25" />
        <line x1="80" y1="80" x2="320" y2="320" stroke={r} strokeWidth="1" opacity="0.3" />
        <line x1="320" y1="80" x2="80" y2="320" stroke={r} strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  }

  return (
    <div ref={elRef} style={{ position: 'relative', display: 'inline-block' }}
      onPointerEnter={onEnter} onPointerLeave={onLeave} onClick={onClick} onPointerMove={onMove}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      aria-label={interactive ? `Rodchenko art ${variant}` : undefined}
    >
      <div style={{
        display: 'block', willChange: hovered || clicked ? 'transform' : 'auto',
        transition: reduced ? 'none' : 'transform 0.6s ease',
        transform: !reduced && clicked ? 'scale(1.05) rotate(2deg)' : !reduced && hovered ? 'scale(1.02)' : 'scale(1)',
        cursor: interactive ? 'pointer' : 'default',
      }}>
        {arts[variant] || arts[1]}
      </div>

      {showTooltip && hovered && !reduced && (
        <div style={{
          position: 'fixed', left: tooltipPos.x + 16, top: tooltipPos.y - 10,
          zIndex: 9999, pointerEvents: 'none',
          backgroundColor: 'var(--color-black)', color: '#fff',
          padding: '0.75rem 1rem', maxWidth: '240px',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.5,
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: r, letterSpacing: '0.1em' }}>{ctx.year}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>{ctx.technique}</span>
          </div>
          <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>&ldquo;{ctx.quote}&rdquo;</p>
        </div>
      )}
    </div>
  )
}
