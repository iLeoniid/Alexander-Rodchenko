import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GsapReveal from '../components/GsapReveal'
import RodchenkoArt from '../components/RodchenkoArt'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { galleryImages } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reduced) return
    const cards = grid.querySelectorAll<HTMLElement>('[data-gallery-card]')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: batch => gsap.fromTo(batch,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
        ),
      })
    })
    return () => ctx.revert()
  }, [reduced])

  return (
    <main style={pageStyle}>
      <section style={styles.header}>
        <div style={styles.headerBg} />
        <div style={styles.headerArt}><RodchenkoArt variant={4} size={400} /></div>
        <div style={styles.headerContent}>
          <GsapReveal>
            <p style={styles.sectionNumber}>04</p>
            <h1 style={styles.title}>Galería</h1>
            <p style={styles.subtitle}>Obras seleccionadas que muestran la versatilidad y genio de Rodchenko a través de diferentes medios.</p>
          </GsapReveal>
        </div>
      </section>

      <section ref={gridRef} style={styles.grid}>
        {galleryImages.map((item, i) => (
          <div key={item.title} style={styles.card} data-gallery-card data-hover>
            <div style={styles.imageWrap}>
              <RodchenkoArt variant={(i % 7) + 1} size={400} interactive accentColor={
                ['#E53935','#F4C430','#2C3E8F','#E67E22','#F5F0EB','#E53935','#2C3E8F'][i % 7]
              } />
            </div>
            <div style={styles.cardContent}>
              <h2 style={styles.cardTitle}>{item.title}</h2>
              <p style={styles.cardDesc}>{item.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

const pageStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-black)',
  minHeight: '100vh', color: '#fff',
  transition: 'var(--transition-theme)',
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    minHeight: '50vh', display: 'flex', alignItems: 'flex-end', position: 'relative',
    backgroundColor: '#0D0D0D', padding: '8rem 2rem 4rem', overflow: 'hidden',
  },
  headerBg: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0D0D0D 0%, rgba(229,57,53,0.08) 50%, #0D0D0D 100%)' },
  headerArt: { position: 'absolute', right: '2%', top: '10%', opacity: 0.1, pointerEvents: 'none' },
  headerContent: { position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' },
  sectionNumber: { fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-red)', letterSpacing: '0.3em', marginBottom: '1rem' },
  title: { fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' },
  subtitle: { fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.7 },
  grid: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', transition: 'all 0.3s ease' },
  imageWrap: { aspectRatio: '1', overflow: 'hidden' },
  cardContent: { padding: '1.25rem' },
  cardTitle: { fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' },
  cardDesc: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' },
}
