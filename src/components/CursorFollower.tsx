import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor) return

    if (reduced) { cursor.style.display = 'none'; if (trail) trail.style.display = 'none'; return }

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover) { cursor.style.display = 'none'; if (trail) trail.style.display = 'none'; return }

    const mouse = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    const trailPos = { x: 0, y: 0 }
    let targetSize = 24
    let curSize = 24

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    document.addEventListener('mousemove', onMouse)

    let raf: number
    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.12
      pos.y += (mouse.y - pos.y) * 0.12
      trailPos.x += (mouse.x - trailPos.x) * 0.04
      trailPos.y += (mouse.y - trailPos.y) * 0.04
      curSize += (targetSize - curSize) * 0.1
      cursor.style.transform = `translate(${pos.x - curSize / 2}px, ${pos.y - curSize / 2}px)`
      cursor.style.width = `${curSize}px`
      cursor.style.height = `${curSize}px`
      if (trail) trail.style.transform = `translate(${trailPos.x - 4}px, ${trailPos.y - 4}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const interactive = document.querySelectorAll<HTMLElement>('a, button, .btn, [data-hover]')
    const grow = () => { targetSize = 48 }
    const shrink = () => { targetSize = 24 }
    interactive.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })

    return () => {
      document.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
      interactive.forEach(el => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink) })
    }
  }, [reduced])

  return (
    <>
      <div ref={trailRef} aria-hidden="true" style={{
        position: 'fixed', top: 0, left: 0, width: '8px', height: '8px',
        borderRadius: '50%', backgroundColor: 'var(--color-red)',
        pointerEvents: 'none', zIndex: 9998, opacity: 0.2,
      }} />
      <div ref={cursorRef} aria-hidden="true" style={{
        position: 'fixed', top: 0, left: 0, width: '24px', height: '24px',
        borderRadius: '50%', border: '2px solid var(--color-red)',
        pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference',
        willChange: 'transform',
      }} />
    </>
  )
}
