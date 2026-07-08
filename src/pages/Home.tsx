import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { heroContent, stats, quotes } from '../data/content'
import RodchenkoArt from '../components/RodchenkoArt'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const DECO_COLORS = ['#E53935', '#F4C430', '#2C3E8F', '#E67E22']

const descWords = heroContent.description.split(' ')

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const decorRefs = useRef<HTMLDivElement[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const reduced = useReducedMotion()

  const setDecorRef = useCallback((el: HTMLDivElement | null) => {
    if (el) decorRefs.current.push(el)
  }, [])

  // ─── SPLIT TITLE INTO CHARS ──────────────────
  useEffect(() => {
    const title = titleRef.current
    if (!title || reduced) return
    const text = title.textContent!.trim()
    title.textContent = ''
    Array.from(text).forEach(c => {
      const s = document.createElement('span')
      s.textContent = c === ' ' ? '\u00A0' : c
      s.style.display = 'inline-block'
      s.style.position = 'relative'
      title.appendChild(s)
      return s
    })
    return () => { title.textContent = text }
  }, [reduced])

  // ─── HERO TIMELINE ───────────────────────────
  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const desc = descRef.current
    const cta = ctaRef.current
    const scroll = scrollRef.current
    if (!hero || reduced) return

    const ctx = gsap.context(() => {
      // ─── Title chars ───
      const charEls = title?.querySelectorAll('span')
      const charTween = charEls?.length ? gsap.fromTo(charEls, {
        x: () => gsap.utils.random(-400, 400),
        y: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-90, 90),
        opacity: 0,
        scale: 0.2,
        filter: 'blur(20px)',
      }, {
        x: 0, y: 0, rotation: 0, opacity: 1, scale: 1,
        filter: 'blur(0px)',
        duration: 1.6,
        stagger: { each: 0.025, from: 'random' },
        ease: 'power4.out',
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
        const path = `M${50 - r},50 C${50 - r},${50 - r} ${50 + r},${50 - r} ${50 + r},50 C${50 + r},${50 + r} ${50 - r},${50 + r} ${50 - r},50`

        gsap.to(decor, {
          motionPath: { path, align: 'none', autoRotate: true },
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

  // ─── MOUSE PARALLAX ──────────────────────────
  useEffect(() => {
    if (reduced) return
    const hero = heroRef.current
    if (!hero) return

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
      gsap.to('.hero-parallax', {
        x: (mouseRef.current.x - 0.5) * 40,
        y: (mouseRef.current.y - 0.5) * 40,
        rotation: (mouseRef.current.x - 0.5) * 6,
        duration: 1.2, ease: 'power2.out', overwrite: 'auto',
      })
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

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const decorItemStyle = (i: number): React.CSSProperties => ({
    position: 'absolute', width: 20 + i * 12, height: 20 + i * 12,
    border: `2px solid ${DECO_COLORS[i % DECO_COLORS.length]}`,
    opacity: 0.25,
    borderRadius: i % 3 === 0 ? '50%' : '0',
    transform: `rotate(${i * 30}deg)`,
    top: '50%', left: '50%',
    marginTop: -(10 + i * 6), marginLeft: -(10 + i * 6),
    pointerEvents: 'none',
  })

  return (
    <>
      {/* ───── HERO ───── */}
      <section ref={heroRef} style={styles.hero}>
        <div className="hero-gradient" style={styles.overlay} />
        <div style={styles.decorBg} className="hero-parallax">

          <div className="hero-ring" style={styles.decorRing1} />
          <div className="hero-ring-reverse" style={styles.decorRing2} />
          <div className="hero-ring" style={styles.decorRing3} />
          <div className="hero-bg-line" style={styles.decorSlash} />

          <div className="hero-connector" style={styles.connectorH} />
          <div className="hero-connector" style={styles.connectorV} />
          <div className="hero-connector" style={styles.connectorDiag} />

          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} ref={setDecorRef} style={decorItemStyle(i)} />
          ))}

          <div className="hero-parallax" style={styles.decorArt1}>
            <RodchenkoArt variant={6} size={280} />
          </div>
          <div className="hero-parallax" style={styles.decorArt2}>
            <RodchenkoArt variant={3} size={200} />
          </div>
          <div className="hero-parallax" style={styles.decorArt3}>
            <RodchenkoArt variant={1} size={160} />
          </div>
        </div>

        <div style={styles.content}>
          <p style={styles.year}>1891 — 1956</p>
          <h1 ref={titleRef} style={styles.title}>
            {heroContent.title}
          </h1>
          <p ref={subtitleRef} className="hero-subtitle" style={styles.subtitle}>
            Constructivismo · Fotografía · Diseño Gráfico
          </p>
          <p ref={descRef} className="hero-desc" style={styles.description}>
            {descWords.map((word, i) => (
              <span key={i} data-word style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</span>
            ))}
          </p>
          <Link ref={ctaRef} to="/logros" className="hero-cta btn btn--primary" style={styles.cta}>
            <span style={styles.ctaText}>{heroContent.cta}</span>
            <span style={styles.ctaArrow}>→</span>
          </Link>
        </div>

        <div ref={scrollRef} style={styles.scrollIndicator}>
          <span style={styles.scrollText}>Desplázate</span>
          <div className="scroll-line" style={styles.scrollLine} />
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="stats-section" style={styles.statsSection}>
        <div ref={counterRef} style={styles.statsGrid}>
          {stats.map(s => (
            <div key={s.label} className="stat-item" style={styles.stat}>
              <div style={styles.statBarWrap}>
                <div className="stat-bg-bar" style={{ ...styles.statBar }} />
              </div>
              <span className="stat-number" style={styles.statNumber}>{s.number}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── QUOTE ───── */}
      <section ref={quoteRef} style={styles.quoteSection}>
        <div className="quote-ring" style={styles.quoteRing} />
        <div style={styles.quoteInner}>
          <div className="quote-slash" style={styles.quoteSlash} />
          <div style={styles.quoteContent}>
            <span className="quote-mark" style={styles.quoteMark}>&ldquo;</span>
            <blockquote className="quote-text" style={styles.quote}>
              {quotes[0].text}
            </blockquote>
            <footer className="quote-author" style={styles.quoteAuthor}>
              — {quotes[0].author}, <span style={{ fontWeight: 300 }}>{quotes[0].year}</span>
            </footer>
          </div>
        </div>
      </section>
    </>
  )
}

// ───── STYLES ──────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  hero: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative',
    backgroundColor: '#0D0D0D', color: '#fff', overflow: 'hidden', padding: '0 2rem',
  },
  overlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, rgba(229,57,53,0.12) 0%, transparent 30%, rgba(44,62,143,0.05) 60%, transparent 100%)',
    backgroundSize: '200% 200%', backgroundPosition: '0% 50%',
    pointerEvents: 'none',
  },
  decorBg: { position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' },
  decorRing1: {
    position: 'absolute', top: '5%', right: '8%', width: '50vw', height: '50vw',
    maxWidth: '700px', maxHeight: '700px',
    border: '1px solid rgba(229,57,53,0.15)', borderRadius: '50%',
  },
  decorRing2: {
    position: 'absolute', top: '15%', right: '18%', width: '35vw', height: '35vw',
    maxWidth: '500px', maxHeight: '500px',
    border: '1px solid rgba(244,196,48,0.1)', borderRadius: '50%',
  },
  decorRing3: {
    position: 'absolute', bottom: '10%', left: '5%', width: '25vw', height: '25vw',
    maxWidth: '380px', maxHeight: '380px',
    border: '1px solid rgba(44,62,143,0.1)', borderRadius: '50%',
  },
  decorSlash: {
    position: 'absolute', top: 0, right: '20%', width: '1px', height: '100%',
    background: 'linear-gradient(to bottom, transparent, rgba(229,57,53,0.25), transparent)',
    transform: 'skewX(-18deg)',
  },
  connectorH: {
    position: 'absolute', top: '30%', left: '5%', width: '20%', height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(229,57,53,0.2))',
  },
  connectorV: {
    position: 'absolute', top: '20%', right: '30%', width: '1px', height: '25%',
    background: 'linear-gradient(to bottom, transparent, rgba(244,196,48,0.2))',
  },
  connectorDiag: {
    position: 'absolute', top: '60%', left: '60%', width: '15%', height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(44,62,143,0.2))',
    transform: 'rotate(45deg)',
  },
  decorArt1: { position: 'absolute', right: '-3%', top: '8%', opacity: 0.08 },
  decorArt2: { position: 'absolute', left: '-2%', bottom: '5%', opacity: 0.06 },
  decorArt3: { position: 'absolute', right: '15%', bottom: '20%', opacity: 0.05 },

  content: { position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' },
  year: {
    fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.4em',
    color: 'var(--color-red)', marginBottom: '1.5rem', textTransform: 'uppercase',
  },
  title: {
    fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.92,
    letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '1.5rem',
    overflow: 'visible',
  },
  subtitle: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
    fontWeight: 500, letterSpacing: '0.18em', color: 'var(--color-red)',
    marginBottom: '1.5rem', textTransform: 'uppercase',
  },
  description: {
    fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
    fontWeight: 300, color: 'rgba(255,255,255,0.65)', maxWidth: '520px',
    lineHeight: 1.7, marginBottom: '2.5rem', perspective: '800px',
  },
  cta: {
    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
    fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
    padding: '0.9rem 2rem',
    backgroundColor: 'var(--color-red)', color: '#fff',
    border: '2px solid var(--color-red)',
    cursor: 'pointer', overflow: 'hidden',
  },
  ctaText: { position: 'relative', zIndex: 1 },
  ctaArrow: { position: 'relative', zIndex: 1, fontSize: '1.1rem', lineHeight: 1 },

  scrollIndicator: {
    position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
  },
  scrollText: {
    fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.25em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
  },
  scrollLine: { width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--color-red), transparent)' },

  statsSection: { padding: '6rem 2rem', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' },
  statsGrid: {
    maxWidth: 'var(--container-max)', margin: '0 auto',
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem',
  },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative' },
  statBarWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: 'rgba(0,0,0,0.1)' },
  statBar: { height: '100%', backgroundColor: 'var(--color-red)', transformOrigin: 'bottom center' },
  statNumber: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: 900, color: 'var(--color-red)', lineHeight: 1,
  },
  statLabel: {
    fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)',
    textTransform: 'uppercase', letterSpacing: '0.12em',
  },

  quoteSection: {
    padding: '8rem 2rem', backgroundColor: 'var(--color-black)', color: '#fff',
    textAlign: 'center', position: 'relative', overflow: 'hidden',
  },
  quoteRing: {
    position: 'absolute', top: '50%', left: '50%', width: '60vw', height: '60vw',
    maxWidth: '800px', maxHeight: '800px', marginTop: '-30vw', marginLeft: '-30vw',
    border: '1px solid rgba(229,57,53,0.06)', borderRadius: '50%',
    pointerEvents: 'none',
  },
  quoteInner: { position: 'relative', maxWidth: '700px', margin: '0 auto' },
  quoteSlash: {
    position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px',
    backgroundColor: 'rgba(229,57,53,0.2)',
    transform: 'skewX(-15deg)',
  },
  quoteContent: { padding: '0 1.5rem', position: 'relative' },
  quoteMark: {
    fontFamily: 'var(--font-display)', fontSize: '4rem', lineHeight: 0.8,
    color: 'var(--color-red)', opacity: 0.3, display: 'block', marginBottom: '-0.5rem',
  },
  quote: {
    fontFamily: 'var(--font-body)', fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, margin: '1rem 0',
  },
  quoteAuthor: {
    marginTop: '1.5rem', fontSize: '0.85rem', fontWeight: 600, fontStyle: 'normal',
    color: 'var(--color-red)', textTransform: 'uppercase', letterSpacing: '0.12em',
  },
}
