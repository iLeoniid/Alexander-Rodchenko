import { useState } from 'react'
import GsapReveal from '../components/GsapReveal'
import RodchenkoArt from '../components/RodchenkoArt'
import { covers } from '../data/content'

export default function Covers() {
  const [compareMode, setCompareMode] = useState(false)
  const [selected, setSelected] = useState<number[]>([])

  const toggleSelect = (idx: number) => {
    if (!compareMode) return
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) :
      prev.length < 2 ? [...prev, idx] :
      [prev[1], idx]
    )
  }

  const clearCompare = () => { setSelected([]); setCompareMode(false) }

  return (
    <main style={pageStyle}>
      <section style={styles.header}>
        <div style={styles.headerBg} />
        <div style={styles.headerArt}><RodchenkoArt variant={5} size={350} /></div>
        <div style={styles.headerContent}>
          <GsapReveal>
            <p style={styles.sectionNumber}>03</p>
            <h1 style={styles.title}>Portadas</h1>
            <p style={styles.subtitle}>Una selección de sus diseños editoriales más icónicos, donde la tipografía y la imagen se fusionan.</p>
          </GsapReveal>
        </div>
      </section>

      <div style={styles.toolbar}>
        <button onClick={() => setCompareMode(!compareMode)}
          style={{
            ...styles.compareBtn,
            backgroundColor: compareMode ? 'var(--color-red)' : 'transparent',
            color: compareMode ? '#fff' : 'var(--text-secondary)',
            borderColor: compareMode ? 'var(--color-red)' : 'var(--color-gray-light)',
          }}
        >
          {compareMode ? 'Salir de comparación' : 'Comparar portadas'}
        </button>
        {compareMode && (
          <span style={styles.compareHint}>
            {selected.length === 0 ? 'Seleccioná 2 portadas para comparar' :
             selected.length === 1 ? 'Seleccioná una más' : ''}
          </span>
        )}
      </div>

      {compareMode && selected.length === 2 ? (
        <div style={styles.compareView}>
          <button onClick={clearCompare} style={styles.closeCompare}>×</button>
          {selected.map(i => {
            const item = covers[i]
            return (
              <div key={i} style={styles.compareCard}>
                <div style={styles.compareImage}>
                  <RodchenkoArt variant={(i % 7) + 1} size={400} showTooltip />
                </div>
                <div style={styles.compareInfo}>
                  <h3 style={styles.compareTitle}>{item.title}</h3>
                  <p style={styles.compareMeta}>{item.subtitle}</p>
                  <p style={styles.compareDesc}>{item.description}</p>
                  <div style={styles.tags}>
                    {item.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <section style={styles.grid}>
          {covers.map((item, i) => (
            <GsapReveal key={item.title} delay={i * 0.05} variant="fadeUp">
              <div
                style={{
                  ...styles.card,
                  ...(compareMode && selected.includes(i) ? styles.cardSelected : {}),
                  ...(compareMode && !selected.includes(i) && selected.length === 2 ? styles.cardDimmed : {}),
                }}
                data-hover
                onClick={() => toggleSelect(i)}
              >
                <div style={styles.cardImage}>
                  <RodchenkoArt variant={(i % 7) + 1} size={400} accentColor={
                    ['#E53935','#F4C430','#2C3E8F','#E67E22','#F5F0EB','#E53935','#2C3E8F'][i % 7]
                  } />
                  <div style={styles.cornerTop} />
                  <div style={styles.cornerBottom} />
                  <span style={styles.yearTag}>{item.year}</span>
                  {compareMode && (
                    <span style={{
                      ...styles.checkMark,
                      backgroundColor: selected.includes(i) ? 'var(--color-red)' : 'rgba(0,0,0,0.5)',
                    }}>
                      {selected.includes(i) ? '✓' : '+'}
                    </span>
                  )}
                </div>
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{item.title}</h2>
                  <p style={styles.cardSubtitle}>{item.subtitle}</p>
                  <p style={styles.cardDesc}>{item.description}</p>
                  <div style={styles.tags}>
                    {item.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                  </div>
                </div>
              </div>
            </GsapReveal>
          ))}
        </section>
      )}
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
  headerArt: { position: 'absolute', right: '8%', bottom: '10%', opacity: 0.1, pointerEvents: 'none' },
  headerContent: { position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' },
  sectionNumber: { fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-red)', letterSpacing: '0.3em', marginBottom: '1rem' },
  title: { fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' },
  subtitle: { fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.7 },
  toolbar: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '2rem 1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' } as React.CSSProperties,
  compareBtn: { fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.5rem 1.25rem', border: '1px solid', cursor: 'pointer', transition: 'all 0.3s ease' },
  compareHint: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' },
  compareView: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', position: 'relative' as const },
  closeCompare: { position: 'absolute', top: '1rem', right: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', lineHeight: 1, zIndex: 2 },
  compareCard: { backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--color-gray-light)', overflow: 'hidden' },
  compareImage: { aspectRatio: '3/4', overflow: 'hidden' },
  compareInfo: { padding: '1.5rem' },
  compareTitle: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' },
  compareMeta: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-red)', marginBottom: '0.75rem', fontStyle: 'italic' },
  compareDesc: { fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' },
  grid: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '3rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' },
  card: { backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--color-gray-light)', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.4s ease, opacity 0.3s ease', cursor: 'default' },
  cardSelected: { borderColor: 'var(--color-red)', boxShadow: '0 0 0 2px var(--color-red)' },
  cardDimmed: { opacity: 0.4 },
  cardImage: { aspectRatio: '3/4', position: 'relative', overflow: 'hidden' },
  cornerTop: { position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '3px solid var(--color-red)', borderLeft: '3px solid var(--color-red)', zIndex: 1 },
  cornerBottom: { position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '3px solid var(--color-red)', borderRight: '3px solid var(--color-red)', zIndex: 1 },
  yearTag: { position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#fff', backgroundColor: 'var(--color-red)', padding: '0.25rem 0.5rem', letterSpacing: '0.05em', zIndex: 2 },
  checkMark: { position: 'absolute', top: '1rem', left: '1rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, zIndex: 2, transition: 'background-color 0.2s ease' },
  cardContent: { padding: '1.5rem' },
  cardTitle: { fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '-0.01em' },
  cardSubtitle: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-red)', marginBottom: '0.75rem', fontStyle: 'italic' },
  cardDesc: { fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  tag: { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.6rem', backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--color-gray-light)' },
}
