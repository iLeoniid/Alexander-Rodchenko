import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { navItems } from '../data/content'
import { useTheme, type AccentColor } from '../context/ThemeContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

const accentList: { name: AccentColor; color: string }[] = [
  { name: 'red', color: '#E53935' },
  { name: 'amarillo', color: '#F4C430' },
  { name: 'azul', color: '#2C3E8F' },
  { name: 'naranja', color: '#E67E22' },
  { name: 'blanco', color: '#F5F0EB' },
]

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLAnchorElement[]>([])
  const logoRef = useRef<HTMLSpanElement>(null)
  const { theme, toggleMode, setAccent } = useTheme()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.fromTo(linksRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' })
      if (logoRef.current) gsap.fromTo(logoRef.current, { rotateX: -90 }, { rotateX: 0, duration: 0.8, ease: 'back.out(1.7)' })
    }, navRef)
    return () => ctx.revert()
  }, [reducedMotion])

  useEffect(() => { setIsOpen(false) }, [location])

  // focus trap + escape
  useEffect(() => {
    if (!isOpen) return
    const menu = menuRef.current
    if (!menu) return

    const focusable = menu.querySelectorAll<HTMLElement>('a, button')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsOpen(false); hamburgerRef.current?.focus(); return }
      if (e.key !== 'Tab') return
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    first?.focus()
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : '' }, [isOpen])

  const isOverHero = location.pathname === '/' && !scrolled
  const textColor = isOverHero ? '#fff' : 'var(--text-primary)'
  const bgColor = isOverHero ? 'transparent' : 'var(--bg-secondary)'

  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <nav ref={navRef} role="navigation" aria-label="Navegación principal" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: bgColor, borderBottom: scrolled ? '1px solid rgba(128,128,128,0.15)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.4s ease, border-color 0.3s ease, backdrop-filter 0.4s ease',
        padding: scrolled ? '0.5rem 0' : '1rem 0',
      }}>
        <div style={styles.container}>
          <Link to="/" style={{ ...styles.logo, color: textColor }} aria-label="Ir al inicio">
            <span style={styles.logoRed}>A</span>
            <span ref={logoRef} style={styles.logoText}>RODCHENKO</span>
          </Link>

          <div style={styles.desktopNav}>
            {navItems.map((item, i) => (
              <Link key={item.path} to={item.path}
                ref={el => { if (el) linksRef.current[i] = el }}
                style={{ ...styles.link, color: textColor, ...(location.pathname === item.path ? { borderBottomColor: 'var(--color-red)' } : {}) }}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div style={styles.controls}>
            <button onClick={toggleMode}
              style={{ ...styles.modeBtn, color: textColor }}
              aria-label={theme.mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme.mode === 'dark'
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              }
            </button>

            <div style={styles.colorDots} role="radiogroup" aria-label="Color de acento">
              {accentList.map(a => (
                <button key={a.name} onClick={() => setAccent(a.name)} role="radio"
                  aria-checked={theme.accent === a.name} aria-label={`Color ${a.name}`}
                  style={{ ...styles.colorDot, backgroundColor: a.color, opacity: theme.accent === a.name ? 1 : 0.5, transform: theme.accent === a.name ? 'scale(1.2)' : 'scale(1)' }}
                />
              ))}
            </div>

            <button ref={hamburgerRef} onClick={() => setIsOpen(p => !p)}
              style={styles.hamburger} aria-label="Abrir menú de navegación"
              aria-expanded={isOpen} aria-controls="mobile-menu"
            >
              <span style={{ ...styles.line, backgroundColor: textColor, transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ ...styles.line, backgroundColor: textColor, opacity: isOpen ? 0 : 1 }} />
              <span style={{ ...styles.line, backgroundColor: textColor, transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menú de navegación"
        style={{ position: 'fixed', inset: 0, zIndex: 998, pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div onClick={closeMenu} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', opacity: isOpen ? 1 : 0, transition: 'opacity 0.4s ease' }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 'min(80vw, 400px)', height: '100vh',
          backgroundColor: 'var(--color-black)', transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: reducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: '6rem 2rem 2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto',
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '4px', backgroundColor: 'var(--color-red)', opacity: 0.5 }} />
          {navItems.map(item => (
            <Link key={item.path} to={item.path} onClick={closeMenu}
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                fontWeight: location.pathname === item.path ? 900 : 500,
                color: location.pathname === item.path ? 'var(--color-red)' : '#fff',
                padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                textTransform: 'uppercase', letterSpacing: '0.03em', textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={toggleMode} style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
              padding: '0.75rem 1rem', cursor: 'pointer', fontFamily: 'var(--font-body)',
              fontSize: '0.85rem', width: '100%', marginBottom: '1rem',
            }}>
              {theme.mode === 'dark' ? '☀ Modo claro' : '☾ Modo oscuro'}
            </button>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }} role="radiogroup" aria-label="Color de acento">
              {accentList.map(a => (
                <button key={a.name} onClick={() => { setAccent(a.name); closeMenu() }} role="radio"
                  aria-checked={theme.accent === a.name} aria-label={`Color ${a.name}`}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', padding: 0, backgroundColor: a.color, border: theme.accent === a.name ? '2px solid #fff' : '2px solid transparent' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.15em', textDecoration: 'none', transition: 'color 0.3s ease' },
  logoRed: { color: 'var(--color-red)', fontSize: '1.5rem' },
  logoText: { fontWeight: 500, display: 'inline-block' },
  desktopNav: { display: 'flex', gap: '2rem', alignItems: 'center' } as React.CSSProperties,
  link: { fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.5rem 0', borderBottom: '2px solid transparent', transition: 'color 0.3s ease, border-color 0.3s ease', textDecoration: 'none' },
  controls: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  modeBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', lineHeight: 1, display: 'flex', alignItems: 'center', transition: 'color 0.3s ease' },
  colorDots: { display: 'flex', gap: '0.35rem', alignItems: 'center' },
  colorDot: { width: '12px', height: '12px', borderRadius: '50%', cursor: 'pointer', padding: 0, border: 'none', transition: 'all 0.3s ease' },
  hamburger: { flexDirection: 'column', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 1001 },
  line: { display: 'block', width: '20px', height: '2px', transition: 'all 0.3s ease', borderRadius: '1px' },
}

const mediaQuery = window.matchMedia('(max-width: 768px)')
if (mediaQuery.matches) styles.desktopNav = { display: 'none' }
mediaQuery.addEventListener('change', e => { styles.desktopNav = { display: e.matches ? 'none' : 'flex' } })
