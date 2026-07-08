import { useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { heroContent, stats, quotes } from '../data/content'
import RodchenkoArt from '../components/RodchenkoArt'
import './Home.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const DECO_COLORS = ['#E53935', '#F4C430', '#2C3E8F', '#E67E22'] as const
const DECO_COUNT = 5

const ORBIT_PATHS = [
  (r: number) => `M${50 - r},50 C${50 - r},${50 - r} ${50 + r},${50 - r} ${50 + r},50 C${50 + r},${50 + r} ${50 - r},${50 + r} ${50 - r},50`,
] as const

const todayQuote = quotes[0] ?? { text: 'El arte debe ser construido, no representado.', author: 'Alexander Rodchenko', year: '1920' }

const descWords = heroContent.description.split(' ')

const titleChars = heroContent.title.split('').map(c => c === ' ' ? '\u00A0' : c)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  const decorRefs = useRef<(HTMLDivElement | null)[]>([])
  decorRefs.current = new Array(DECO_COUNT).fill(null)

  const parallaxRefs = useRef<(HTMLElement | null)[]>([])
  parallaxRefs.current = []

  const setParallaxRef = (el: HTMLElement | null) => {
    if (el) parallaxRefs.current.push(el)
  }

  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  charRefs.current = new Array(titleChars.length).fill(null)

  const reduced = useReducedMotion()

  const quickToX = useRef<gsap.QuickToFunc | null>(null)
  const quickToY = useRef<gsap.QuickToFunc | null>(null)

  // ─── HERO TIMELINE ───────────────────────────
  useEffect(() => {
    const hero = heroRef.current
    const subtitle = subtitleRef.current
    const desc = descRef.current
    const cta = ctaRef.current
    const scroll = scrollRef.current
    if (!hero || reduced) return

    const ctx = gsap.context(() => {
      // ─── Title chars from render-time refs ───
      const charEls = charRefs.current.filter(Boolean) as HTMLSpanElement[]
      const charTween = charEls.length ? gsap.fromTo(charEls, {
        x: () => gsap.utils.random(-400, 400),
        y: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-90, 90),
        opacity: 0, scale: 0.2, filter: 'blur(20px)',
      }, {
        x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: 1.6, stagger: { each: 0.025, from: 'random' }, ease: 'power4.out',
      }) : null

      // ─── Subtitle clip-path ───
      const subTween = subtitle ? gsap.fromTo(subtitle,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.9, ease: 'power3.inOut' }
      ) : null

      // ─── Description words ───
      const wordEls = desc?.querySelectorAll('[data-word]')
      const wordTween = wordEls?.length ? gsap.fromTo(wordEls, {
        y: 20, opacity: 0, rotationX: -40, transformPerspective: 600,
      }, {
        y: 0, opacity: 1, rotationX: 0,
        duration: 0.6, stagger: 0.04, ease: 'back.out(1.7)',
      }) : null

      // ─── CTA button ───
      const ctaTween = cta ? gsap.fromTo(cta,
        { scale: 0, rotation: -15, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' }
      ) : null

      // ─── Scroll indicator ───
      if (scroll) {
        gsap.fromTo(scroll, { opacity: 0, y: -20 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 2.2,
        })
        gsap.to(scroll.querySelector('.scroll-line')!, {
          scaleY: 0.3, transformOrigin: 'top center',
          duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut',
        })
      }

      // ─── Master timeline ───
      const masterTl = gsap.timeline({ delay: 0.2 })
      if (charTween) masterTl.add(charTween, 0)
      if (subTween) masterTl.add(subTween, 0.4)
      if (wordTween) masterTl.add(wordTween, 0.7)
      if (ctaTween) masterTl.add(ctaTween, 1.0)

      // ─── Orbiters ───
      decorRefs.current.forEach((decor, i) => {
        if (!decor) return
        const r = 80 + i * 60

        gsap.to(decor, {
          motionPath: { path: ORBIT_PATHS[0](r), align: 'none', autoRotate: true },
          duration: 12 + i * 4, repeat: -1, ease: 'none',
        })
        gsap.to(decor, {
          rotation: 360, duration: 20 + i * 5, repeat: -1, ease: 'none',
        })
        gsap.to(decor, {
          scale: i % 2 === 0 ? 1.3 : 0.8,
          duration: 2 + i * 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
        })
      })

      // ─── Background continuous ───
      const rings = hero.querySelectorAll<HTMLElement>('.hero-ring, .hero-ring-reverse')
      gsap.to(rings[0]!, { rotation: 360, duration: 80, repeat: -1, ease: 'none' })
      if (rings[1]) gsap.to(rings[1], { rotation: -360, duration: 60, repeat: -1, ease: 'none' })
      if (rings[2]) gsap.to(rings[2], { rotation: 360, duration: 100, repeat: -1, ease: 'none' })

      gsap.to('.hero-bg-line', {
        scaleY: 1.2, scaleX: 1.1, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })

      const bgGrad = hero.querySelector<HTMLElement>('.hero-gradient')
      if (bgGrad) {
        gsap.to(bgGrad, {
          backgroundPosition: '100% 50%', duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
        })
      }

      // ─── Connector lines ───
      hero.querySelectorAll<HTMLElement>('.hero-connector').forEach((line, i) => {
        gsap.fromTo(line, { scaleX: 0, transformOrigin: i % 2 === 0 ? 'left center' : 'right center' }, {
          scaleX: 1, duration: 1.2, delay: 1.5 + i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: hero, start: 'top 60%' },
        })
      })
    }, hero)

    return () => ctx.revert()
  }, [reduced])

  // ─── MOUSE PARALLAX with quickTo ────────────
  useEffect(() => {
    if (reduced || parallaxRefs.current.length === 0) return

    quickToX.current = gsap.quickTo(parallaxRefs.current[0]!, 'x', { duration: 0.8, ease: 'power2' })
    quickToY.current = gsap.quickTo(parallaxRefs.current[0]!, 'y', { duration: 0.8, ease: 'power2' })

    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 40
      quickToX.current?.(x)
      quickToY.current?.(y)
    }

    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [reduced])

  // ─── COUNTERS ────────────────────────────────
  useEffect(() => {
    const container = counterRef.current
    if (!container || reduced) return

    const ctx = gsap.context(() => {
      container.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.textContent || '0')
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target, duration: 2.5, ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el.closest('.stats-section'), start: 'top 80%' },
        })
      })

      gsap.fromTo('.stat-item', {
        y: 60, opacity: 0, scale: 0.8, rotation: -5,
      }, {
        y: 0, opacity: 1, scale: 1, rotation: 0,
        duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.stats-section', start: 'top 75%' },
      })

      gsap.fromTo('.stat-bg-bar', {
        scaleY: 0, transformOrigin: 'bottom center',
      }, {
        scaleY: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-section', start: 'top 80%' },
      })
    }, container)

    return () => ctx.revert()
  }, [reduced])

  // ─── QUOTE ────────────────────────────────────
  useEffect(() => {
    const container = quoteRef.current
    if (!container || reduced) return

    const qText = container.querySelector('.quote-text')
    const qAuthor = container.querySelector('.quote-author')
    if (!qText || !qAuthor) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: container, start: 'top 75%' },
      })

      tl.fromTo(container.querySelector('.quote-slash')!,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.6, ease: 'power3.inOut' }
      )
        .fromTo(qText, { y: 40, opacity: 0, rotationX: -20, transformPerspective: 800 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .fromTo(qAuthor, { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .fromTo(container.querySelector('.quote-mark')!, { scale: 0, rotation: -90 },
          { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.5')

      gsap.to('.quote-ring', { rotation: 360, duration: 40, repeat: -1, ease: 'none' })
    }, container)

    return () => ctx.revert()
  }, [reduced])

  // ─── COORDINATED ScrollTrigger refresh ──────
  useLayoutEffect(() => {
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  const decorItemStyle = useMemo(() =>
    Array.from({ length: DECO_COUNT }, (_, i) => ({
      position: 'absolute' as const, width: 20 + i * 12, height: 20 + i * 12,
      border: `2px solid ${DECO_COLORS[i % DECO_COLORS.length]}`,
      opacity: 0.25,
      borderRadius: i % 3 === 0 ? '50%' : '0',
      transform: `rotate(${i * 30}deg)`,
      top: '50%', left: '50%',
      marginTop: -(10 + i * 6), marginLeft: -(10 + i * 6),
      pointerEvents: 'none' as const,
    })), []
  )

  return (
    <>
      {/* ───── HERO ───── */}
      <section ref={heroRef} className="hero">
        <div className="overlay" />
        <div className="decorBg">
          <div className="hero-ring decorRing1" />
          <div className="hero-ring-reverse decorRing2" />
          <div className="hero-ring decorRing3" />
          <div className="hero-bg-line decorSlash" />

          <div className="hero-connector connectorH" />
          <div className="hero-connector connectorV" />
          <div className="hero-connector connectorDiag" />

          {Array.from({ length: DECO_COUNT }, (_, i) => (
            <div key={i} ref={el => { decorRefs.current[i] = el }} style={decorItemStyle[i]} />
          ))}

          <div ref={setParallaxRef} className="decorArt1">
            <RodchenkoArt variant={6} size={280} />
          </div>
          <div ref={setParallaxRef} className="decorArt2">
            <RodchenkoArt variant={3} size={200} />
          </div>
          <div ref={setParallaxRef} className="decorArt3">
            <RodchenkoArt variant={1} size={160} />
          </div>
        </div>

        <div className="content">
          <p className="year">1891 — 1956</p>
          <h1 className="title">
            {titleChars.map((char, i) => (
              <span key={i} ref={el => { charRefs.current[i] = el }} style={{ display: 'inline-block', position: 'relative' }}>
                {char}
              </span>
            ))}
          </h1>
          <p ref={subtitleRef} className="subtitle">
            Constructivismo · Fotografía · Diseño Gráfico
          </p>
          <p ref={descRef} className="description">
            {descWords.map((word, i) => (
              <span key={i} data-word style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</span>
            ))}
          </p>
          <Link ref={ctaRef} to="/logros" className="cta">
            <span className="ctaText">{heroContent.cta}</span>
            <span className="ctaArrow">→</span>
          </Link>
        </div>

        <div ref={scrollRef} className="scrollIndicator">
          <span className="scrollText">Desplázate</span>
          <div className="scroll-line scrollLine" />
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="statsSection">
        <div ref={counterRef} className="statsGrid">
          {stats.map(s => (
            <div key={s.label} className="stat-item stat">
              <div className="statBarWrap">
                <div className="stat-bg-bar statBar" />
              </div>
              <span className="stat-number statNumber">{s.number}</span>
              <span className="statLabel">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── QUOTE ───── */}
      <section ref={quoteRef} className="quoteSection">
        <div className="quote-ring quoteRing" />
        <div className="quoteInner">
          <div className="quote-slash quoteSlash" />
          <div className="quoteContent">
            <span className="quote-mark quoteMark">&ldquo;</span>
            <blockquote className="quote-text quote">
              {todayQuote.text}
            </blockquote>
            <footer className="quote-author quoteAuthor">
              — {todayQuote.author}, <span style={{ fontWeight: 300 }}>{todayQuote.year}</span>
            </footer>
          </div>
        </div>
      </section>
    </>
  )
}
