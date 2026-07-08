import GsapReveal from '../components/GsapReveal'
import RodchenkoArt from '../components/RodchenkoArt'
import { contributions } from '../data/content'

export default function Contributions() {
  return (
    <main style={pageStyle}>
      <section style={styles.header}>
        <div style={styles.headerBg} />
        <div style={styles.headerArt}><RodchenkoArt variant={3} size={350} /></div>
        <div style={styles.headerContent}>
          <GsapReveal>
            <p style={styles.sectionNumber}>02</p>
            <h1 style={styles.title}>Aportes</h1>
            <p style={styles.subtitle}>Cómo Rodchenko transformó el arte, la sociedad y la forma en que vemos el mundo.</p>
          </GsapReveal>
        </div>
      </section>

      <section style={styles.grid}>
        {contributions.map((item, i) => (
          <GsapReveal key={item.title} delay={i * 0.08} variant="scale">
            <div style={styles.card} data-hover>
              <div style={styles.iconWrap}>
                <span style={styles.icon}>{item.icon}</span>
              </div>
              <h2 style={styles.cardTitle}>{item.title}</h2>
              <p style={styles.cardDesc}>{item.description}</p>
              <div style={styles.cardAccent} />
            </div>
          </GsapReveal>
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
  headerArt: { position: 'absolute', right: '3%', bottom: '0', opacity: 0.12, pointerEvents: 'none' },
  headerContent: { position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' },
  sectionNumber: { fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-red)', letterSpacing: '0.3em', marginBottom: '1rem' },
  title: { fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' },
  subtitle: { fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.7 },
  grid: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default' },
  iconWrap: { width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(229,57,53,0.1)', borderRadius: '50%' },
  icon: { lineHeight: 1 },
  cardTitle: { fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.01em' },
  cardDesc: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' },
  cardAccent: { position: 'absolute', top: 0, left: 0, width: '4px', height: 0, backgroundColor: 'var(--color-red)', transition: 'height 0.3s ease' },
}
