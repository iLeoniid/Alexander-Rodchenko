import { useEffect, useRef, useLayoutEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type Variant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'diagonal' | 'lineDraw'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  variant?: Variant
  duration?: number
  offset?: number
  onComplete?: () => void
}

export default function GsapReveal({
  children, className, delay = 0, variant = 'fadeUp',
  duration = 0.8, offset = 120, onComplete,
}: Props) {
  const elRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const lineLengthRef = useRef(0)

  useLayoutEffect(() => {
    if (variant !== 'lineDraw' || reduced) return
    const el = elRef.current
    if (!el) return
    const path = el.querySelector('path, circle, rect, polygon, line')
    if (path) lineLengthRef.current = (path as SVGGeometryElement).getTotalLength()
  }, [variant, reduced])

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    if (reduced) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      onComplete?.()
      return
    }

    const fromMap: Record<Variant, gsap.TweenVars> = {
      fadeUp: { y: offset, opacity: 0 },
      fadeLeft: { x: -offset, opacity: 0 },
      fadeRight: { x: offset, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      diagonal: { x: -offset * 0.5, y: offset * 0.5, opacity: 0, rotation: -5 },
      lineDraw: { strokeDashoffset: lineLengthRef.current || offset, opacity: 1 },
    }

    const fromVars = fromMap[variant]

    const toVars: gsap.TweenVars = {
      y: 0, x: 0, scale: 1, opacity: 1, rotation: 0, scaleX: 1,
      duration, delay, ease: 'power3.out', onComplete,
    }

    if (variant === 'lineDraw') {
      toVars.strokeDashoffset = 0
      el.style.strokeDasharray = `${lineLengthRef.current || offset}`
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(el, fromVars, {
        ...toVars,
        scrollTrigger: { trigger: el, start: `top ${100 - offset / 10}%`, toggleActions: 'play none none reverse' },
      })
    })

    return () => ctx.revert()
  }, [delay, variant, duration, offset, onComplete, reduced])

  return <div ref={elRef} className={className}>{children}</div>
}
