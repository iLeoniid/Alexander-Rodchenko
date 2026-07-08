import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface Layer {
  children: ReactNode
  speed: number
}

interface Props {
  children: ReactNode
  speed?: number
  direction?: 'vertical' | 'horizontal'
  className?: string
  layers?: Layer[]
}

function useDynamicWillChange() {
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    observerRef.current = new IntersectionObserver(entries => {
      for (const entry of entries) {
        (entry.target as HTMLElement).style.willChange = entry.isIntersecting ? 'transform' : 'auto'
      }
    }, { rootMargin: '200px' })
    observerRef.current.observe(el)
    return () => observerRef.current?.disconnect()
  }, [])

  return ref
}

export default function ParallaxSection({ children, speed = 0.3, direction = 'vertical', className, layers }: Props) {
  const innerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = innerRef.current
    const parent = sectionRef.current?.parentElement
    if (!el || !parent || reduced) return

    const prop = direction === 'vertical' ? 'y' : 'x'

    const ctx = gsap.context(() => {
      gsap.fromTo(el, { [prop]: 0 }, {
        [prop]: () => -window.innerHeight * speed * 0.2,
        ease: 'none',
        scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
    })
    return () => ctx.revert()
  }, [speed, direction, reduced])

  return (
    <div ref={sectionRef} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <div ref={innerRef}>{children}</div>
      {layers?.map((layer, i) => <ParallaxLayer key={i} speed={layer.speed} reduced={reduced}>{layer.children}</ParallaxLayer>)}
    </div>
  )
}

function ParallaxLayer({ children, speed, reduced }: Layer & { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const willRef = useDynamicWillChange()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: 0 }, {
        y: () => -window.innerHeight * speed * 0.3,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 2 },
      })
    })
    return () => ctx.revert()
  }, [speed, reduced])

  return <div ref={willRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{children}</div>
}
