import { useState, useMemo } from 'react'
import GsapReveal from '../components/GsapReveal'
import RodchenkoArt from '../components/RodchenkoArt'
import ParallaxSection from '../components/ParallaxSection'
import { achievements, type AchievementCategory } from '../data/content'

const categories: { key: 'todas' | AchievementCategory; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'arte', label: 'Arte' },
  { key: 'fotografia', label: 'Fotografía' },
  { key: 'diseno', label: 'Diseño' },
]

const decades = [1910, 1920, 1930, 1940, 1950]

function parseYearRange(range: string): number {
  const m = range.match(/\d{4}/)
  return m ? parseInt(m[0]) : 1920
}

export default function Achievements() {
  const [filter, setFilter] = useState<'todas' | AchievementCategory>('todas')
  const [decade, setDecade] = useState(0)

  const filtered = useMemo(() => {
    const cat = filter === 'todas' ? achievements : achievements.filter(a => a.category === filter)
    if (decade === 0) return cat
    return cat.filter(a => {
      const y = parseYearRange(a.year)
      return y >= decade && y < decade + 10
    })
  }, [filter, decade])

  return (
    <main style={pageStyle}>
      <section style={styles.header}>
        <div style={styles.headerBg} />
        <div style={styles.headerArt}><RodchenkoArt variant={2} size={400} /></div>
        <div style={styles.headerContent}>
          <GsapReveal>
            <p style={styles.sectionNumber}>01</p>
            <h1 style={styles.title}>Logros</h1>
            <p style={styles.subtitle}>Los hitos que marcaron la carrera de uno de los artistas más influyentes del siglo XX.</p>
          </GsapReveal>
        </div>
      </section>

      <div style={styles.controls}>
        <div style={styles.filters}>
          {categories.map(c => (
            <button key={c.key} onClick={() => setFilter(c.key)}
              style={{
                ...styles.filterBtn,
                backgroundColor: filter === c.key ? 'var(--color-red)' : 'transparent',
                color: filter === c.key ? '#fff' : 'var(--text-secondary)',
                borderColor: filter === c.key ? 'var(--color-red)' : 'var(--color-gray-light)',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={styles.decadeWrap}>
          <span style={styles.decadeLabel}>Década</span>
          <div style={styles.decadeSlider}>
            {decades.map(d => (
              <button key={d} onClick={() => setDecade(decade === d ? 0 : d)}
                style={{
                  ...styles.decadeBtn,
                  backgroundColor: decade === d ? 'var(--color-red)' : 'transparent',
                  color: decade === d ? '#fff' : 'var(--text-secondary)',
                  borderColor: decade === d ? 'var(--color-red)' : 'var(--color-gray-light)',
                }}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>
      </div>

      <section style={styles.timeline}>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0', fontFamily: 'var(--font-body)' }}>
            No hay logros en esta década para esta categoría.
          </p>
        )}
        {filtered.map((item, i) => (
          <GsapReveal key={item.title} delay={i * 0.1} variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'}>
            <ParallaxSection speed={0.1}>
              <div style={{ ...styles.card, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' } as React.CSSProperties}>
                <div style={styles.cardImage}>
                  <RodchenkoArt variant={(i % 7) + 1} size={400} interactive accentColor="var(--color-red)" showTooltip />
                  <div style={styles.cardYearBadge}>{item.year}</div>
                </div>
                <div style={styles.cardContent}>
                  <span style={styles.cardYear}>{item.year}</span>
                  <h2 style={styles.cardTitle}>{item.title}</h2>
                  <p style={styles.cardDesc}>{item.description}</p>
                </div>
              </div>
            </ParallaxSection>
          </GsapReveal>
        ))}
      </section>
    </main>
  )
}

const pageStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-primary)',
  minHeight: '100vh', transition: 'var(--transition-theme)',
}

const styles: Record<string, React.CSSProperties> = {
  header: { minHeight: '50vh', display: 'flex', alignItems: 'flex-end', position: 'relative', backgroundColor: 'var(--color-black)', color: '#fff', padding: '8rem 2rem 4rem', overflow: 'hidden' },
  headerBg: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 50%, #1A1A1A 100%)' },
  headerArt: { position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', opacity: 0.15, pointerEvents: 'none' },
  headerContent: { position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' },
  sectionNumber: { fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-red)', letterSpacing: '0.3em', marginBottom: '1rem' },
  title: { fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' },
  subtitle: { fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.7 },
  controls: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '2rem 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' } as React.CSSProperties,
  filters: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } as React.CSSProperties,
  filterBtn: { fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.5rem 1rem', border: '1px solid', cursor: 'pointer', transition: 'all 0.3s ease' },
  decadeWrap: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  decadeLabel: { fontFamily: 'var(--font-body)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' },
  decadeSlider: { display: 'flex', gap: '0.25rem' },
  decadeBtn: { fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 500, padding: '0.4rem 0.65rem', border: '1px solid', cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.05em' },
  timeline: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '3rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '4rem' },
  card: { display: 'flex', gap: '3rem', alignItems: 'center' },
  cardImage: { flex: '0 0 40%', aspectRatio: '4/3', position: 'relative', overflow: 'hidden', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' },
  cardYearBadge: { position: 'absolute', bottom: '1rem', right: '1rem', fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 500, color: '#fff', backgroundColor: 'var(--color-red)', padding: '0.3rem 0.6rem', letterSpacing: '0.1em' },
  cardContent: { flex: 1 },
  cardYear: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-red)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' },
  cardTitle: { fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: '1rem', letterSpacing: '-0.02em' },
  cardDesc: { fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)' },
}
